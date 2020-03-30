# DEV_LOG

## Sunday 29.3.2020

DONE: 
- Use comicvm-geometry-2d as a git submodule
- Found the target design of DomElements: 
    -- You can create a DomElement by calling its constructor.
    -- You can create a DomElement by calling create() and passing a configuration.
    -- You can append a DomElement by passing a container.
    -- You can append a DomElement by calling append() on a parent DomElement.
 
LEARNINGS:
- you need the webpack *resolve* plugin tsconfig-paths-webpack-plugin to define paths in tsconfig.json

TODO:
- drop DomElement.container 
- drop Div.appendDiv and stuff
- generalize append(): should accept DomElementContent (also arrays of DomElementContent ?)
- add static create() methods
- write documentation i.e. a demo using DomElements


# Monday 30.3.2020

DONE: 
- all of the TODOs above
- unit tests
- push to github
