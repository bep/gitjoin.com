---
title: About gitjoin
---

## What is gitjoin?

gitjoin is an open-source command-line tool that turns many Git repositories
into one virtual monorepo. It joins independent repositories into a single,
navigable working tree without rewriting history, without submodules, and
without forcing teams to consolidate their codebases.

## Why a virtual monorepo?

A virtual monorepo gives you the developer-experience benefits of a monorepo —
one tree to search, build, format, and review across — while each repository
stays independently versioned and owned. Polyrepo on disk, monorepo at the
workbench.

## Features

- Minimal configuration — one small config file per virtual tree.
- No history rewrites: original repositories remain untouched.
- A lightweight alternative to Git submodules and subtree merges.
- Written in Go; runs on Linux, macOS, and Windows.
- Free and open source under the MIT license.

## Get gitjoin

Source code, releases, and documentation live on GitHub:
[{{% param "repoURL" %}}]({{% param "repoURL" %}}).
