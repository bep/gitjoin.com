---
title: About gitjoin
params:
  programmingLanguage: Go
  licenseName: Apache-2.0
  licenseURL: https://www.apache.org/licenses/LICENSE-2.0
  install: go install github.com/bep/gitjoin@latest
  # The hero demo: a workspace tree where every `repo` line gets cloned when gitjoin runs.
  # p = tree prefix, n = name, k = kind (dir, file, manifest, repo).
  tree:
    - { p: "", n: "~/work", k: dir }
    - { p: "├── ", n: "go", k: dir }
    - { p: "│   ├── ", n: "AGENTS.md", k: file }
    - { p: "│   ├── ", n: "apps", k: dir }
    - { p: "│   │   ├── ", n: "gitjoin.txt", k: manifest }
    - { p: "│   │   ├── ", n: "gitjoin", k: repo }
    - { p: "│   │   ├── ", n: "grrep", k: repo }
    - { p: "│   │   └── ", n: "s3deploy", k: repo }
    - { p: "│   └── ", n: "libs", k: dir }
    - { p: "│       ├── ", n: "gitjoin.txt", k: manifest }
    - { p: "│       ├── ", n: "helpers", k: repo }
    - { p: "│       └── ", n: "godartsass", k: repo }
    - { p: "└── ", n: "sites", k: dir }
    - { p: "    ├── ", n: "AGENTS.md", k: file }
    - { p: "    ├── ", n: "gitjoin.txt", k: manifest }
    - { p: "    ├── ", n: "gitjoin.com", k: repo }
    - { p: "    └── ", n: "grrep.com", k: repo }
  facts:
    - { value: "1", label: "plain-text manifest format" }
    - { value: "2", label: "flags, --force and --quiet" }
    - { value: "0", label: "commits in the parent repo" }
    - { value: "4+", label: "repos synced in parallel" }
  steps:
    - id: list
      title: List your repos
      body: Add one repository per line to a `gitjoin.txt`. Put the files in any directory, nest them as deep as you like.
      file: go/apps/gitjoin.txt
      code: |
        # Lines starting with # are comments.
        github.com/bep/gitjoin
        github.com/bep/grrep
        github.com/bep/s3deploy
    - id: sync
      title: Run gitjoin
      body: From the root, or from any subdirectory to sync just that subtree. Missing repos are cloned, existing ones pulled, delisted ones removed.
      file: zsh
      code: |
        $ gitjoin
        Updated: 2 repos
          - go/apps/grrep (pulled)
          - sites/gitjoin.com (pulled)
        Cloned: 2 repos
          - go/libs/godartsass
          - go/libs/helpers
        Removed: 2 repos
          - go/apps/oldtool
          - sites/oldsite.com
        Skipped (uncommitted changes): 2 repos
          - go/apps/s3deploy (2 modified)
          - sites/grrep.com (1 added)
    - id: work
      title: Work across all of them
      body: Search, edit, script and prompt across one tree. gitjoin keeps the cloned repos out of the parent's history with a managed `.gitignore` section.
      file: go/apps/.gitignore
      code: |
        /public/

        # Managed by gitjoin - do not edit this section
        /gitjoin/
        /grrep/
        /s3deploy/
        # End gitjoin managed section
  features:
    - title: Plain-text manifest
      body: One repository per line, `#` for comments. Adding or removing a repo is a one-line diff, not a Git operation.
    - title: Clone, pull, prune
      body: One command brings the tree in line with the manifests. Only repos gitjoin cloned are ever removed.
    - title: Safe by default
      body: Repos with uncommitted changes or on a feature branch are skipped and reported, never touched.
    - title: "`--force` when you mean it"
      body: Stash, switch to the default branch, pull, unstash. If the unstash conflicts, the stash is left intact.
    - title: Nested and partial
      body: "`gitjoin.txt` files are found recursively. Start in any subdirectory to sync only that subtree."
    - title: Shared context
      body: Drop an `AGENTS.md` or `firstup.env` next to a group of repos and it applies to all of them, outside their history.
    - title: Peers, not pins
      body: Every repo stays on its default branch and remains fully independent. No detached HEADs.
    - title: Parallel
      body: Repos are synced concurrently, at least four at a time, or one per CPU core if you have more.
  useCases:
    - Share one `AGENTS.md` across every Go repository.
    - Share API keys across all AWS applications with [firstupdotenv](https://github.com/bep/firstupdotenv).
    - Update dependencies in all Go repos in one go.
    - Prompt an AI agent to make changes across repos and open the PRs.
    - Search everything with [grrep](https://github.com/bep/grrep), which understands gitjoin boundaries.
  compare:
    - { aspect: "Relationship", submodules: "Pinned dependencies", gitjoin: "Independent peers" }
    - { aspect: "A child repo changes", submodules: "Commit in the parent", gitjoin: "Nothing to commit" }
    - { aspect: "Checkout", submodules: "Detached HEAD at a pinned commit", gitjoin: "Default branch, kept up to date" }
    - { aspect: "Add or remove a repo", submodules: "git submodule add / deinit", gitjoin: "Edit one line" }
    - { aspect: "Built for", submodules: "Reproducible, pinned trees", gitjoin: "A workspace you actively develop" }
---
