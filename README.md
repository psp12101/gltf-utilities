# glTF Utilities

JavaScript utility library for working with glTF models.  This library provides a consistent API for loading various glTF resources, such as images, shaders, and buffers, from a remote URL (both same-origin and cross-origin) or embedded using a [data URI](https://developer.mozilla.org/en-US/docs/data_URIs).

## How to use

Include `gltfUtilities.js` in your page.  This creates a global variable `gltfUtilities` with the following functions:

### `loadImage(url, success, error)`

This function will asynchronously load the given URL (or [data URI](https://developer.mozilla.org/en-US/docs/data_URIs)) as an Image.  In order to load cross-origin data, the server must have [Cross-Origin Resource Sharing (CORS)](http://enable-cors.org/) enabled.

```javascript
gltfUtilities.loadImage(imageUrl, function(image) {
  // The image loaded successfully
}, function(error) {
  // The image failed to load
});
```

### `loadText(url, success, error)`

This function will asynchronously load the given URL (or [data URI](https://developer.mozilla.org/en-US/docs/data_URIs)) as a String.  If an error occurs, the error callback will be passed the [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) object used to make the request.  In order to load cross-origin data, the server must have [Cross-Origin Resource Sharing (CORS)](http://enable-cors.org/) enabled.

```javascript
gltfUtilities.loadText(shaderUrl, function(text) {
  // The text loaded successfully
}, function(xhr) {
  // The text failed to load
});
```

### `loadArrayBuffer(url, success, error)`

This function will asynchronously load the given URL (or [data URI](https://developer.mozilla.org/en-US/docs/data_URIs)) as an [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBuffer).  If an error occurs, the error callback will be passed the [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) object used to make the request.  In order to load cross-origin data, the server must have [Cross-Origin Resource Sharing (CORS)](http://enable-cors.org/) enabled.

```javascript
gltfUtilities.loadArrayBuffer(bufferUrl, function(arrayBuffer) {
  // The ArrayBuffer loaded successfully
}, function(xhr) {
  // The ArrayBuffer failed to load
});
```