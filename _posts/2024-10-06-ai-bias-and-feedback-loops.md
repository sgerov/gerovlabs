---
layout: post
title: AI Bias and Feedback loops
date: 2024-10-06 00:00:00
description: On how AI imposes a danger and further perpetuates human flaws.
tags: ai
categories: exploration
featured: false
---

As usage of social networks keeps growing so does the power of their underlying algorithms with their ever-growing datasets and AI capabilities. They are optimised for interactions and/or time-spent on the platforms while only becoming better through time. No ethical lenses seem to be baked into such systems since their main incentive is economical growth. [Policy isn't doing enough](https://www.reuters.com/article/world/un-investigators-cite-facebook-role-in-myanmar-crisis-idUSKCN1GO2Q4/) to protect us so far.

<div class="text-center">
    {% include figure.liquid loading="eager" path="assets/img/statista-social-usage.png" class="img-fluid rounded z-depth-1 w-50 " zoomable=true %}
    <div class="caption">
        Daily time spent on social media 2012-2024 according to <a href="https://www.statista.com/statistics/433871/daily-social-media-usage-worldwide/">Statista</a>
    </div>
</div>

The issue goes way beyond choosing the right metric to optimise for since bias and hazardous feedback loops are embedded in the whole delivery chain. The Markulla Center [defines a set of ethical lenses](https://www.scu.edu/ethics/ethics-resources/a-framework-for-ethical-decision-making/) which can help us navigate and understand the problems imposed in the current tech landscape:

- `Rights`: focuses on respecting the fundamental rights of all individuals involved. It prompts us to ask if a particular action or tech infringes on anyone's rights such as privacy, safety, or equal opportunity
- `Justice`: aims fairness and equity. It encourages us to consider whether an action or tech treats people fairly and whether it perpetuates existing inequalities
- `Utilitarian`: involves assessing the overall benefits/harms of an action or tech. The goal is to pick the option that maximises benefit and minimises harm for the greatest number of people possible
- `Common Good`: emphasises the well-being of the entire community as a whole, not just specific individuals or subgroups. It prompts us to consider how an action or tech affects the overall health and society
- `Virtue`: considers cultivating ethical character and aligning actions with virtues (like honesty, responsibility, and compassion). It encourages individuals and organisations to act reflecting their values

Let's have a look at some relevant examples we can look at through these lenses:

**YouTube recommendations engine**

The reinforcement learning feedback loops optimised for maximising watch time can be devastating. It can happen by accident [by promoting pedophile content](https://www.nytimes.com/2019/06/03/world/americas/youtube-pedophiles.html) or [on purpose by exploiting algorithms nature](https://www.nytimes.com/2017/10/23/technology/youtube-russia-rt.html).

Such examples violate children rights to safety and privacy or individuals rights to access accurate information by promoting conspiracy theories. Also by disproportionately recommending extremist content, YouTube's algorithm creates an uneven playing field where certain viewpoints, often harmful and misleading, gain prominence.

**Google ads race discrimination**

[A study](https://arxiv.org/abs/1301.6822) conducted by Professor Latanya Sweeney revealed that Google displayed ads suggesting an arrest record more frequently for searches of black-identifying names than for white-identifying names, regardless of whether the individuals had any arrest history or not.

{% include figure.liquid loading="eager" path="assets/img/ads-sample.png" class="img-fluid rounded z-depth-1 w-md-50 float-md-right ml-md-2"%}

It supposes a violation of individuals rights to equal treatment and non-discrimination by perpetuating harmful stereotypes and creating an environment where individuals are treated differently based on their race leading to unequal opportunities.

**Arkansas healthcare**

A buggy and opaque algorithm [led to drastic cuts in healthcare benefits](https://www.theverge.com/2018/3/21/17144260/healthcare-medicaid-algorithm-arkansas-cerebral-palsy) for vulnerable individuals which represents a failure on fundamental rights to essential healthcare services. It exemplifies an unjust and disproportionate impact of algorithmic errors on marginalised communities.

**Amplifying Gender Imbalance**

[Researchers found](https://arxiv.org/abs/1901.09451) algorithms predicting occupations not only reflected existing gender imbalances in occupations (e.g. more female nurses, more male pastors) but actually amplified them in its predictions. The model oversimplified the relationship between gender and occupation, leading to an overrepresentation of the dominant gender in certain professions, thus perpetuating existing inequalities.

### Conclusion

These examples showcase the urgent need for ethical considerations while developing, deploying, and regulating AI and algorithmic systems. They highlight the potential for these technologies to amplify existing societal biases and cause real-world harm, specially to vulnerable populations. Addressing the challenges requires a cross-disciplinary approach including tech, regulation, and a strong ethical guidance for developers, policymakers, and end users.

The advent of LLMs to generate human-quality text at scale further compounds the issue since exploiting existing systems, biases and human flaws become even more prominent.

For further information please read [Chapter 3 of fast.ai book](https://www.amazon.com/Deep-Learning-Coders-fastai-PyTorch/dp/1492045527).