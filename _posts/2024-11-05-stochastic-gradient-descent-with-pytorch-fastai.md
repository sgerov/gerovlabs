---
layout: post
title: Stochastic Gradient Descent (SGD) with PyTorch and Fast.ai
date: 2024-11-05 00:00:00
description: Enhancing vanilla Gradient Descent performance to be able to converge on a minimum much quicker with Stochastic Gradient Descent (SGD).
tags: ai
categories: exploration
featured: false
---

In previous posts we implemented Gradient Descent in Ruby to [approximate a quadratic function]({% post_url 2024-10-16-gradient-descent-from-scratch %}), extended it [to any function]({% post_url 2024-10-23-estimate-any-function %}) with the help of PyTorch tensors and gradients calculation and made a [simple digit classifier]({% post_url 2024-11-02-from-ball-to-computer-vision %}).

In this post we'll build on top of those posts and introduce **Stochastic Gradient Descent** while leveraging further PyTorch and Fast.ai libraries to simplify the code we've been using so far.

### Stochastic Gradient Descent

According to the [Cambridge Dictionary](https://dictionary.cambridge.org/dictionary/english/stochastic) definition, *a stochastic process or system is connected with random probability*. Why would we add randomness in the Gradient Descent we've seen so far? It's all about making the process faster, specially for large datasets. 

As a reminder, in previous posts we generated a `x` and `y` pair and ran all our inputs `x` through our neural network to get some predictions `preds` which we would later compare to our expected outputs `y`.

```python
preds = model(x)
```

In our [last post]({% post_url 2024-11-02-from-ball-to-computer-vision %}) `model` was a linear function at first:

```python
def linear1(x): return x@weights + bias
``` 

which we later switched to a neural network to improve our predictions:

```python
def simple_neural_net(x): 
    res = x@w1 + b1
    res = res.sigmoid()
    res = res@w2 + b2
    return res
```

We can see that the amount of parameters (weights and biases) and activation functions (sigmoid in this sample) vary depending on what model function we are using in our error optimisation through Gradient Descent. As we increase the hidden layers of a neural network we increase the number of gradients we need to calculate for each input. Additionaly we can increase the dimensions of our input (1 for a quadratic function, 784 for a simple 28x28 grayscale png image). 

The [simple digit classifier sample]({% post_url 2024-11-02-from-ball-to-computer-vision %}) (which uses **~12k samples** for its training) with no GPU acceleration already takes **13.8 seconds** to train in my MacBook Pro. With such a small sample my CPU is already struggling!

That's where Stochastic Gradient Descent kicks in: it uses randomised chunks of our `x` and `y` input dataset pairs to calculate the gradient on the loss and adjusts our parameters before seeing our whole dataset. E.g. if we split our dataset into 100 chunks, Stochastic Gradient Descent will update the parameters 100 times before it did a full run on our data. That implies that once we did a full epoch (we ran through all data) we already updated our weights and biases 100 times as opposed to only just once [while still converging due to the law of large numbers](https://en.wikipedia.org/wiki/Law_of_large_numbers).

### Implementation

We can use the PyTorch *Dataloders* and *Datasets* to get an iterator of our `x` and `y` tensors.

A *Dataset* is just a list of key-value pairs (in its simplest form, there is also a [Dataset class](https://pytorch.org/docs/stable/data.html#torch.utils.data.Dataset) for more structured and efficient data handling):

```python
x = [1, 2, 3, 4]
y = [1, 0, 1, 1]
dset = list(zip(x,y))
dset
# [(1, 1), (2, 0), (3, 1), (4, 1)]
```

And a *Dataloader* gives us an iterator that can go through all data shuffling it randomly in batches of fixed size:

```python
dl = DataLoader(dset, batch_size=2, shuffle=True)
list(dl)
#[
#  (tensor([3, 1]), tensor([1, 1])), # random batch 1
#  (tensor([4, 2]), tensor([1, 0]))  # random batch 2
#]
```

With that, we are ready to go from running through the whole dataset each epoch:

```python
preds = model(x)
loss = loss_fx(preds, y)
loss.backward()
with torch.no_grad(): parameters -= parameters.grad * lr
parameters.grad.zero_()
```

To doing it in batches, hence adjusting our parameters `data_length / batches` times before we do a full epoch:

```python
ds = list(zip(x, y))
dl = DataLoader(ds, batch_size=256, shuffle=True)
for xb, yb in dl
  preds = model(xb)
  loss = loss_fx(preds, yb)
  loss.backward()
  with torch.no_grad(): parameters -= parameters.grad * lr
  parameters.grad.zero_()
```

Only applying this change I was able to re-run the [digit classifier sample]({% post_url 2024-11-02-from-ball-to-computer-vision %}) and reduced the runtime **from 14 to 4 seconds**! A side-effect of running multiple adjustments per epoch is that we will need less epochs to optimise our parameters enough so that we get a good accuracy. In this sample I was able to achieve the same accuracy result (94%) with 2 epochs and a 256 batch size as I did with 100 epochs and no batching at all (with a fixed learning rate).

### PyTorch and Fast.ai constructs

There are plenty of modules that PyTorch and fast.ai provide to ease the process we've described in the last posts. 

The first simplification we can do is around how we define our linear model:

```diff
-def init_params(size, std=1.0): return (torch.randn(size)*std).requires_grad_()
-def linear1(x): return x@weights + bias
-weights = init_params((28*28,1))
-bias = init_params(1)
+linear1 = nn.Linear(28*28,1)
+weights, bias = linear1.parameters()
```

Same principle applies to our neural network:

```diff
-def init_params(size, std=1.0): return (torch.randn(size)*std).requires_grad_()
-def simple_net(xb): 
-    res = xb@w1 + b1
-    res = res.sigmoid()
-    res = res@w2 + b2
-    return res
-w1 = init_params((28*28,50))
-b1 = init_params(50)
-w2 = init_params((50,1))
-b2 = init_params(1)
+simple_net = nn.Sequential(
+    nn.Linear(28*28,50),
+    nn.Sigmoid(),
+    nn.Linear(50,1)
+)
+w1, b1, w2, b2 = simple_net.parameters()
```

Another useful abstraction we can use is in the optimisation step where fastai provides SGD class to handle it:

```diff
-with torch.no_grad(): parameters -= parameters.grad * lr
-parameters.grad = None
+opt = SGD(simple_net.parameters(), lr)
+opt.step()
+opt.zero_grad()
```

We can go one step further with fast.ai and actually user a learner for the training process with no custom training code at all:

```diff
-for xb, yb in dl
-  preds = simple_net(xb)
-  loss = loss_fx(preds, yb)
-  loss.backward()
-  with torch.no_grad(): parameters -= parameters.grad * lr
-  parameters.grad.zero_()
+dls = DataLoaders(dl, ()) # skipping the validation set and accuracy
+learn = Learner(dls, simple_net, opt_func=SGD,
+                loss_func=mnist_loss)
+learn.fit(20, lr=0.01)
```

### Full example

The entire [digit classifier example]({% post_url 2024-11-02-from-ball-to-computer-vision %}) would turn into the following (non-refactored for the sake of explicitness) code:

**Import dependencies**

```python
from fastai.vision.all import *
```

**Data setup**

```python
path = untar_data(URLs.MNIST)

# fives
fives_filenames = (path/'training'/'5').ls().sorted()
fives_tensors = [tensor(Image.open(o)) for o in fives_filenames]
fives = torch.stack(fives_tensors).float()/255
fours_filenames = (path/'training'/'4').ls().sorted()
fours_tensors = [tensor(Image.open(o)) for o in fours_filenames]
fours = torch.stack(fours_tensors).float()/255

# fours
validation_fives_filenames = (path/'testing'/'5').ls().sorted()
validation_fives_tensors = [tensor(Image.open(o)) for o in validation_fives_filenames]
validation_fives = torch.stack(validation_fives_tensors).float()/255
validation_fours_filenames = (path/'testing'/'4').ls().sorted()
validation_fours_tensors = [tensor(Image.open(o)) for o in validation_fours_filenames]
validation_fours = torch.stack(validation_fours_tensors).float()/255

# x and y for training and validation
x = torch.cat([fives, fours]).view(-1, 28*28)
y = tensor([1]*len(fives) + [0]*len(fours)).unsqueeze(1)
validation_x = torch.cat([validation_fives, validation_fours]).view(-1, 28*28)
validation_y = tensor([1]*len(validation_fives) + [0]*len(validation_fours)).unsqueeze(1)

# datasets and dataloaders
dset = list(zip(train_x,train_y))
dl = DataLoader(dset, batch_size=256, shuffle=True)
valid_dset = list(zip(valid_x,valid_y))
valid_dl = DataLoader(valid_dset, batch_size=256)
dls = DataLoaders(dl, valid_dl)
```

**Functions used during training**

```python
def mnist_loss(predictions, targets):
    predictions = predictions.sigmoid()
    return torch.where(targets==1, 1-predictions, predictions).mean()

def batch_accuracy(xb, yb):
    preds = xb.sigmoid()
    correct = (preds>0.5) == yb
    return correct.float().mean()
```

**Training with simple neural net**

```python
simple_net = nn.Sequential(
    nn.Linear(28*28,30),
    nn.ReLU(),
    nn.Linear(30,1)
)

learn = Learner(dls, simple_net, opt_func=SGD,
                loss_func=mnist_loss, metrics=batch_accuracy)
learn.fit(20, lr=0.01)
```

### Leveraging fast.ai further

We could go a few steps further and leverage a `vision_learner` from fast.ai with its `ImageDataLoaders` that handle all the data loading (for all numbers), training, accuracy calculation and fitting for us within only 3 lines of code (and a 18-layers architecture):

```python
dls = ImageDataLoaders.from_folder(path, train='training', valid='testing')
learn = vision_learner(dls, resnet18, pretrained=False,
                    loss_func=F.cross_entropy, metrics=accuracy)
learn.fit_one_cycle(1, 0.1) # fit with learning rate scheduling for quicker convergence
```

I've deployed another sample leveraging fast.ai abstractions further to finetune a resnet18 pretrained model to [recognise LOTR characters from photos]({% post_url 2024-09-29-fastai-finetuning-a-classifier %}) with [a working custom deployment](https://gerovlabs.com/ai-models/).