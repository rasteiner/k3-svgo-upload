# Kirby k3-svgo-upload plugin

Optimize SVG images before uploading them

## Installation

### Download

Download and copy this repository to `/site/plugins/k3-svgo-upload`.

### Git submodule

```
git submodule add https://github.com/rasteiner/k3-svgo-upload.git site/plugins/k3-svgo-upload
```

### Composer

```
composer require rasteiner/k3-svgo-upload
```

## Setup

Add `svgo: true` to the files fields / sections where you want to optimize the SVG images:

```yml
fields:
  images:
    type: files
    svgo: true
```

## License

MIT

## Credits

- [Roman Steiner](https://getkirby.com/plugins/rasteiner)
