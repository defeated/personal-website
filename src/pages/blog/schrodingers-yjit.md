---
layout: "../../layouts/BlogLayout.astro"
title: "Schrodinger's Compiler or The Current State of Ruby YJIT"
description: "Ruby 3.2.0 includes a production-ready, just-in-time compiler; YJIT is now the default... or is it?"
pubDate: 2023 January 12
image:
  path: "/blog/ruby-cpu-squooshed.jpg"
  alt: "Illustration of a computer language compiler."
---

## [YJIT - Yet Another Ruby JIT](#yjit---yet-another-ruby-jit)

Ruby [v3.1](https://www.ruby-lang.org/en/news/2021/12/25/ruby-3-1-0-released/)
introduced an experimental just-in-time compiler, developed by Shopify,
affectionately named YJIT. Fast forward to Ruby's traditional Christmas release
in December 2022 and
[v3.2](https://www.ruby-lang.org/en/news/2022/12/25/ruby-3-2-0-released/) was
announced, removing the "experimental" label from YJIT and declaring it
production-ready.

Between Ruby 3.1 and 3.2 the YJIT compiler was rewritten from C to Rust. The
[benchmarks](https://gettalong.org/blog/2022/benchmarking-rubies.html) look
very promising - especially for longer running processes - averaging 41% faster
with only 33% as much memory overhead. This change in technology brought
an incremental increase in complexity, including some hoops to jump through in
order to take full advantage of this new mode.

## [Is YJIT installed by default? Maybe.](#is-yjit-installed-by-default-maybe)

When building and installing Ruby from source, if
[Rust](https://www.rust-lang.org/) v1.58 or newer is found on your path _and_
you're on a supported platform (macOS or Linux running `x86-64` or
`arm64`/`aarch64`), YJIT will automatically be compiled:

```bash
checking for rustc... rustc
checking whether rustc works for YJIT... yes
```

## [Is YJIT enabled by default? No.](#is-yjit-enabled-by-default-no)

The [YJIT docs](https://github.com/ruby/ruby/blob/master/doc/yjit/yjit.md#command-line-options)
mention it is disabled by default. Depending on your use case, you may or may
not want YJIT enabled during runtime. As discussed on this Mastodon thread,
YJIT optimization only occurs after a method has been executed 30 times:

> [@solnic](https://ruby.social/@solnic) [@joeldrapper](https://ruby.social/@joeldrapper) By default, YJIT optimises a method on the 30th time you call it. You can change that with a command line param. But if your methods aren't run very many times, YJIT is often not a help. So we don't recommend it for unit tests, as a rule.
>
> [Noah Gibbs](https://ruby.social/@codefolio/109573860732354569)
>
> Source: https://www.solnic.dev/i/92815145/ruby-with-yjit#%C2%A7ruby-with-yjit


That means it's probably overhead on something like a test suite, but as always,
your mileage may vary. To enable it at runtime, we have a couple of options. You can pass the `--yjit` argument to `ruby` cli or set one of two environment variables, `RUBY_YJIT_ENABLE=1` or
`RUBYOPT=--yjit`

If YJIT was not installed but you try to run Ruby with YJIT enabled, you'll
see the following warning:

```bash
ruby --yjit -v
# => ruby: warning: Ruby was built without YJIT support.
# => You may need to install rustc to build Ruby with YJIT.
# => ruby 3.2.0 (2022-12-25 revision a528908271) [aarch64-linux]
```

Otherwise, you'll see a **+YJIT** indicator in the version string:

```bash
ruby --yjit -v
# => ruby 3.2.0 (2022-12-25 revision a528908271) +YJIT [x86_64-linux]
```

You can also interrogate the `RubyVM` object at runtime to see if YJIT is
enabled:

```ruby
puts RubyVM::YJIT.enabled?
# => true
```

## [What about Docker?](#what-about-docker)

At the time of this writing, the official Docker Ruby images from
https://hub.docker.com/_/ruby only included support for YJIT in the **Alpine**
flavor of Linux, due to outdated versions of **Rust** included in the Debian
package repositories. 😔

---

**ℹ️ Update:** 2023 January 13

Supported Rust versions have now been
[merged](https://github.com/docker-library/official-images/pull/13886) into the
official Docker Ruby images making YJIT supported in the following distros:

  * Alpine 3.16 & 3.17
  * Debian Buster
  * Debian Bullseye

I also learned recently that https://ruby-lang.org provide their own Docker
images, which add support for YJIT to the following distros:

  * Ubuntu Focal
  * Ubuntu Jammy
