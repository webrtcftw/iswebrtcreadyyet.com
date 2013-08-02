# iswebrtcready.org

Promoting WebRTC support through the clever use of a website with words on it.

## Developing on this

It's a static site served by github pages but the html is written in jade but comes with a super simple little watcher script. 

Leave this file running and it'll watch for changes on index.jade and complile it to index.html

Just run:

```
npm i
node watch.js
```

(Alternatively, you can use LiveReload (or similar) and enable "Compile Jade" in the settings for that directory.)
