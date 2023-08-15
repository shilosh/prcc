#!/bin/bash
git checkout master && \
(git branch -D dist || true) && \
git checkout -b dist && \
rm .gitignore && \
npm run build --base-href prcc && \
cp dist/prccapp/index.html dist/prccapp/404.html && \
git add dist/prccapp && \
git commit -m dist && \
(git branch -D gh-pages || true) && \
git subtree split --prefix dist/prccapp -b gh-pages && \
git push -f origin gh-pages:gh-pages && \
git checkout master && \
git branch -D gh-pages && \
git branch -D dist && \
git checkout . 