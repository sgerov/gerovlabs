---
layout: post
title: Rails, Tailwindcss and Kamal on Apple Silicon
date: 2025-01-25 00:00:00
description: The default setup for tailwindcss-rails does not work with Apple Silicon. This post will show you how to fix it.
tags: rails
categories: exploration
featured: false
---

I spent some time trying to get [tailwindcss-rails](https://github.com/rails/tailwindcss-rails) to work with Apple Silicon (M4). The default Rails setup didn't work for me and I had to find a workaround. This post will show you how to fix it if you run into the same issue.

## The problem

By default [tailwindcss-rails gem](https://github.com/rails/tailwindcss-rails) will rely on a self-contained `tailwindcss` executable. Its architecture is inferred from [tailwindcss-ruby gem](https://github.com/flavorjones/tailwindcss-ruby/). While deploying with Kamal, if you are targeting `amd64` (as is quite common), the error you would get is something like:

```bash
 > [build 6/6] RUN SECRET_KEY_BASE_DUMMY=1 ./bin/rails assets:precompile --trace:
0.893 /usr/local/bundle/ruby/3.3.0/gems/railties-8.0.1/lib/rails/command.rb:150:in `invoke_rake'
0.893 /usr/local/bundle/ruby/3.3.0/gems/railties-8.0.1/lib/rails/command.rb:67:in `block in invoke'
0.893 /usr/local/bundle/ruby/3.3.0/gems/railties-8.0.1/lib/rails/command.rb:143:in `with_argv'
0.893 /usr/local/bundle/ruby/3.3.0/gems/railties-8.0.1/lib/rails/command.rb:63:in `invoke'
0.893 /usr/local/bundle/ruby/3.3.0/gems/railties-8.0.1/lib/rails/commands.rb:18:in `<main>'
0.893 /usr/local/lib/ruby/3.3.0/bundled_gems.rb:75:in `require'
0.893 /usr/local/lib/ruby/3.3.0/bundled_gems.rb:75:in `block (2 levels) in replace_require'
0.893 /usr/local/bundle/ruby/3.3.0/gems/bootsnap-1.18.4/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:30:in `require'
0.893 ./bin/rails:4:in `<main>'
0.893 Tasks: TOP => assets:precompile => tailwindcss:build
------
Dockerfile:49
--------------------
  47 |
  48 |     # Precompiling assets for production without requiring secret RAILS_MASTER_KEY
  49 | >>> RUN SECRET_KEY_BASE_DUMMY=1 ./bin/rails assets:precompile --trace
  50 |
  51 |
--------------------
ERROR: failed to solve: process "/bin/sh -c SECRET_KEY_BASE_DUMMY=1 ./bin/rails assets:precompile --trace" did not complete successfully: exit code: 1
```

Upon closer inspection you will see that the `tailwindcss` executable returns an `Illegal instruction` error within the Docker build. It seems like Rosetta isn't able to run the `tailwindcss` executable inside the Docker build.

## The solution

The first solution that made the trick for me was to switch the Docker virtualization from `Apple Virtualization Framework` to `Docker VMM`:

<div class="text-center">
  {% include figure.liquid loading="eager" path="assets/img/rails-docker-vm.png" class="img-fluid rounded z-depth-1 w-75 " zoomable=true %}
</div>
<div class="caption">
    Applie Virtualization Framework in Docker Desktop
</div>

`Docker VMM` is in BETA at this point though and I got some buggy behaviour in other steps of the build (`bootsnap` got stuck forever) so my long-term solution was to introduce tailwindcss through [Bun](https://bun.sh/):

```bash
# add tailwindcss and its CLI to your project
bun add -d tailwindcss @tailwindcss/cli

# tell tailwindcss-ruby gem to find the executable in the node_modules
export TAILWINDCSS_INSTALL_DIR=node_modules/.bin
```

P.D. if you also rely on Bun and don't have a [Node runtime](https://nodejs.org/en) in your Rails build you might find the following hack handy:

```bash
ln -s $(which bun) /usr/local/bin/node
```