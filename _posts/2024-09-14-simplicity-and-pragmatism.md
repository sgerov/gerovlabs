---
layout: post
title: Simplicity and Pragmatism
date: 2025-09-14 00:00:00
description: The power of doing less.
tags: software
categories: core-values
featured: false
---

In software development, there's often a tendency to overcomplicate things (worstened by Conways' Law). We're constantly tempted to add more functionality, introduce more abstractions, or build complex architectures to cover every conceivable edge case. But the most effective and maintainable systems often share a common trait: **simplicity**.

Simplicity is not about cutting corners or taking shortcuts. It's about making decisions that reduce unnecessary complexity while still delivering value. In fact, simplicity is often harder to achieve than complexity. It takes discipline, experience, and a clear focus on the **right** problems to solve.

At its core, **simplicity is pragmatic**. It's about solving today's problems, not tomorrow's hypotheticals. It's about avoiding over-engineering and focusing on what's truly essential to deliver value. Let's explore what that means in practice.

> ##### Example
>
> Premature optimisation is a classic example of overcomplicating things unnecessarily, specially for people without much working experience.
{: .block-tip }

#### Accidental complexity

In my experience, most of the complexity in software systems is **accidental**, not **essential**. Accidental complexity comes from poor design choices, over-engineered solutions, and unnecessary abstractions (or architecture) that don't solve the core problem but make the code harder to work with.

As **Sandi Metz** often emphasizes in her work, the goal should always be to design systems that are flexible but simple. Too many devs fall into the trap of “future-proofing” our code by adding layers of abstraction to handle problems that may never arise. This results in bloated, fragile systems that are harder to maintain and extend.

Instead, we should aim to solve the problem at hand with the **simplest possible solution**. Focus on clarity and readability. If the problem grows in complexity later, we can refactor. But don't build complexity into the system before it's necessary (wait for the last responsible moment). Simplicity forces us to focus on what's truly important.

#### The best code is no code

One of the most effective ways to avoid complexity is to write **less code**. In fact, as **DHH (David Heinemeier Hansson)**, the creator of Ruby on Rails, often says, "The best code is no code at all." Every line of code you write is a liability: a potential source of bugs, maintenance headaches, and future complexity.

That's why we should always question whether new code is truly necessary. Can the problem be solved by leveraging existing libraries or frameworks? Can we use a simpler solution, like a built-in language feature or service instead of writing a custom one?

This philosophy also aligns with the **KISS** (Keep It Simple, Stupid) and **DRY** (Don't Repeat Yourself) principles. By avoiding unnecessary duplication and relying on well-established solutions, we can keep our codebases lean and maintainable.

#### Embracing pragmatism

One of the most powerful ideas to emerge from modern frameworks, particularly **Ruby on Rails**, is the concept of **convention over configuration**. The idea is simple: by following a set of sensible defaults (conventions), you can avoid the need for endless configuration and boilerplate.

This is pragmatism in action. Instead of reinventing the wheel every time, we lean on conventions that work well for the majority of cases (think of the 80-20 rule). This reduces the amount of code we have to write and allows us to focus on delivering business value, not wrestling with configuration and setup.

For example, in Rails, you don't need to specify how database columns map to object properties. Rails does it for you based on conventions (ActiveRecord vs Data-Mapper). This simplicity means that developers spend less time on repetitive tasks and more time solving the unique challenges of their application. Obviously there is a trade-off in regards of separation of concerns (and clean architecture) which we need to weight for with our project needs and its future growth.

As developers, we often face the temptation to solve problems in our own unique way. But reinventing the wheel almost always leads to increased complexity and bugs. Instead, we should rely on well-established patterns and solutions whenever possible (which are most probably battle tested in production systems).

#### Clarity above all

One of the most important aspects of simplicity is **clarity**. Code that is easy to read and review is easier to maintain, extend, and debug. Code evolves, and it's important that the people who come after us can understand and modify our code without needing to decipher a convoluted mess.

Simple code is **self-explanatory**. It doesn't rely on clever tricks, obscure syntax or comments. It follows clear conventions and avoids unnecessary complexity. When writing code, we should always prioritize **clarity** over cleverness. Code is read far more often than it is written, so making it easy to read and understand is crucial!

> ##### Example
>
> One of the core principles of Agile development is to deliver value incrementally and adjust as we go. By delivering in small chunks, we can get feedback early and often, making it easier to course-correct if necessary. This iterative approach keeps the codebase simple by ensuring that we're only adding what's absolutely necessary at each stage.
{: .block-tip }

At its core, simplicity is about making the **pragmatic choice** and focusing on delivering value, solving today's problems, and avoiding the pitfalls of over-engineering. By embracing simplicity, we reduce accidental complexity, write less code, and focus on clarity and readability.

We believe that simplicity isn't just a principle - it's a practice. And by keeping things simple, we ensure that our systems are more maintainable, more reliable, and ultimately more valuable to our clients.
