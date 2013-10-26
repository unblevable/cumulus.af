# node-python binding 

python bridge for nodejs!

[![Build Status](https://travis-ci.org/JeanSebTr/node-python.png)](https://travis-ci.org/JeanSebTr/node-python)

Forked from [chrisdickinson/node-python](https://github.com/chrisdickinson/node-python) and updated to use node-gyp

## Installation

```npm install node-python```

Tested on OSX 10.7.4 with node 0.8.15

## Usage

[I](https://github.com/chrisdickinson) bumped this up from "playground" to "binding" on account of it starting to feel like the
right thing to do. 

This is a binding between Node.js and Python; unfortunately as written it actually embeds a
python process inside of Node. It's of extremely alpha quality and was originally written with
the intent of getting a better understanding of the internals of both V8 and CPython.

But, yeah, okay. So the cool things:

    var sys = require('sys');
    var python = require('./binding');
    var pysys = python.import('sys');
    sys.puts(pysys.toString());

Will output python's `sys.path`. And passing in arguments works, too:

    var python = require('./binding'),
    os = python.import('os'),
    cwd = os.getcwd(),
    basename = os.path.basename(cwd);

    var sys = require('sys');

    sys.puts(basename.toString());

Unfortunately Python objects are not really fully translated into native Javascript objects yet;
you have to cast them from whatever they are into whatever you want them to be. At the moment, the
only provided cast is "toString", but that should change in the near future (hopefully).

Passing python objects that you get from calling python functions from javascript can seamlessly
be passed back into python functions (no casting required). Currently there's what [I](https://github.com/chrisdickinson) assume to be
a passable argument translation implementation for simple Objects (ones that act like dicts), 
Arrays, Numbers (maybe?), and Strings.

You can slap together a tiny WSGI hosting thing on it, as well, which is provided in `wsgi.js`.
It's half implemented, but it's midnight on a Sunday and [I](https://github.com/chrisdickinson) should probably sleep.
