# Markdown 化への差し替え

このアーカイブは Smalltalk-2030 リポジトリのルートで展開するオーバーレイです。

旧版の `annex/gut-research-spark/index.html` は tar の展開だけでは削除されないため、先に削除してください。

```sh
rm annex/gut-research-spark/index.html
tar xzf ~/Downloads/gut-research-spark-markdown.tar.gz
bundle exec jekyll clean
bundle exec jekyll serve
```

新しい本文は `annex/gut-research-spark/index.md` です。
HTML は `_layouts/gut-research.html` と、Markdown だけでは表現しにくいレイアウト用の最小限のコンテナに限定しています。
