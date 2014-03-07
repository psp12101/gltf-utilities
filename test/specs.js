(function() {
    "use strict";
    /*global jasmine,describe,xdescribe,it,xit,expect,beforeEach,afterEach,beforeAll,afterAll,spyOn,runs,waits,waitsFor*/
    /*global gltfUtilities*/

    describe('gltfUtilities', function() {
        var result;
        var error;

        beforeEach(function() {
            result = error = undefined;
        });

        function handleSuccess(value) {
            result = value;
        }

        function handleError(value) {
            error = value;
        }

        function successOrError() {
            return typeof result !== 'undefined' || typeof error !== 'undefined';
        }

        function drawToCanvasAndGetDataURL(image) {
            var canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            var context = canvas.getContext('2d');
            context.drawImage(image, 0, 0, image.width, image.height);
            // test to make sure canvas isn't tainted
            return canvas.toDataURL();
        }

        it('can load an image', function() {
            gltfUtilities.loadImage('./testdata/Blue10x10.png', handleSuccess, handleError);

            waitsFor(successOrError);

            runs(function() {
                expect(result).toBeDefined();
                expect(error).not.toBeDefined();
                expect(result.width).toEqual(10);
                expect(result.height).toEqual(10);

                drawToCanvasAndGetDataURL(result);
            });
        });

        it('can load an image from a data uri', function() {
            // encoded version of Blue10x10.png
            var dataUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAEUlEQVQY02NgYPiPF41KY0EA8INjnXt48vIAAAAASUVORK5CYII=';
            gltfUtilities.loadImage(dataUri, handleSuccess, handleError);

            waitsFor(successOrError);

            runs(function() {
                expect(result).toBeDefined();
                expect(error).not.toBeDefined();
                expect(result.width).toEqual(10);
                expect(result.height).toEqual(10);

                drawToCanvasAndGetDataURL(result);
            });
        });

        it('can load a cross-origin image', function() {
            // wikimedia sets the CORS header on their images
            gltfUtilities.loadImage('http://upload.wikimedia.org/wikipedia/en/b/bc/Wiki.png', handleSuccess, handleError);

            waitsFor(successOrError);

            runs(function() {
                expect(result).toBeDefined();
                expect(error).not.toBeDefined();
                expect(result.width).toBeGreaterThan(0);
                expect(result.height).toBeGreaterThan(0);

                drawToCanvasAndGetDataURL(result);
            });
        });

        it('can load an arraybuffer', function() {
            gltfUtilities.loadArrayBuffer('./testdata/skinning-test-box.bin', handleSuccess, handleError);

            waitsFor(successOrError);

            runs(function() {
                expect(result).toBeDefined();
                expect(error).not.toBeDefined();

                expect(result.byteLength).toBeGreaterThan(0);
            });
        });

        it('can load an arraybuffer from a data uri', function() {
            // encoded version of skinning-test-box.bin
            var dataUri = 'data:application/octet-stream;base64,AAAAvwAAQMAAAAC/AAAAPwAAQMAAAAC/AAAAPwAAQMAAAAA/AAAAvwAAQMAAAAA/AAAAvwAAQEAAAAC/AAAAvwAAQEAAAAA/AAAAPwAAQEAAAAA/AAAAPwAAQEAAAAC/AAAAvwAAQMAAAAC/AAAAvwAAAAAAAAC/AAAAPwAAAAAAAAC/AAAAPwAAQMAAAAC/AAAAvwAAQEAAAAC/AAAAPwAAQEAAAAC/AAAAPwAAQMAAAAC/AAAAPwAAAAAAAAC/AAAAPwAAAAAAAAA/AAAAPwAAQMAAAAA/AAAAPwAAQEAAAAC/AAAAPwAAQEAAAAA/AAAAPwAAQMAAAAA/AAAAPwAAAAAAAAA/AAAAvwAAAAAAAAA/AAAAvwAAQMAAAAA/AAAAPwAAQEAAAAA/AAAAvwAAQEAAAAA/AAAAvwAAQMAAAAA/AAAAvwAAAAAAAAA/AAAAvwAAAAAAAAC/AAAAvwAAQMAAAAC/AAAAvwAAQEAAAAA/AAAAvwAAQEAAAAC/AAAAAAAAgL8AAAAAAAAAAAAAgL8AAAAAAAAAAAAAgL8AAAAAAAAAAAAAgL8AAAAAAAAAAAAAgD8AAAAAAAAAAAAAgD8AAAAAAAAAAAAAgD8AAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAIA/AAAAAAAAAAAAAIA/AAAAAAAAAAAAAIA/AAAAAAAAAAAAAIA/AAAAAAAAAAAAAIA/AACAvwAAAAAAAAAAAACAvwAAAAAAAAAAAACAvwAAAAAAAAAAAACAvwAAAAAAAAAAAACAvwAAAAAAAAAAAACAvwAAAAAAAAAAAACAPgAAgD8AAAA/AACAPwAAAD+wqio/AACAPrCqKj8AAIA+AAAAAAAAgD6gqqo+AAAAP6Cqqj4AAAA/AAAAAAAAgD+wqio/AACAPwAAAD8AAEA/AAAAPwAAQD+wqio/AACAP6Cqqj4AAEA/oKqqPgAAQD+wqio/AABAPwAAAD8AAAA/AAAAPwAAAD+wqio/AABAP6Cqqj4AAAA/oKqqPgAAAD+wqio/AAAAPwAAAD8AAIA+AAAAPwAAgD6wqio/AAAAP6Cqqj4AAIA+oKqqPgAAgD6wqio/AACAPgAAAD8AAAAAAAAAPwAAAACwqio/AACAPqCqqj4AAAAAoKqqPqdEDT27K3c/AAAAAAAAAABfUgY94Zp3PwAAAAAAAAAA9EgNPXcrdz8AAAAAAAAAAC5OBj0km3c/AAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAp0QNPbsrdz8AAAAAAAAAAByVez8/XI08AAAAAAAAAAC8k3s/qIeNPAAAAAAAAAAAX1IGPeGadz8AAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAX1IGPeGadz8AAAAAAAAAALyTez+oh408AAAAAAAAAAD7lHs/fWGNPAAAAAAAAAAA9EgNPXcrdz8AAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAA9EgNPXcrdz8AAAAAAAAAAPuUez99YY08AAAAAAAAAADuk3s/aoKNPAAAAAAAAAAALk4GPSSbdz8AAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAALk4GPSSbdz8AAAAAAAAAAO6Tez9qgo08AAAAAAAAAAAclXs/P1yNPAAAAAAAAAAAp0QNPbsrdz8AAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAgAAAAIAAwAEAAUABgAEAAYABwAIAAkACgAIAAoACwAJAAwADQAJAA0ACgAOAA8AEAAOABAAEQAPABIAEwAPABMAEAAUABUAFgAUABYAFwAVABgAGQAVABkAFgAaABsAHAAaABwAHQAbAB4AHwAbAB8AHAAAAIA/zlfkFgAAAAAAAAAA73SnCjG9O7MAAIC/AAAAAM5X5JYAAIA/Mb07swAAAAAXt1E43TsGND0KN0AAAIA/Mb07swAAgD+AjFIlAAAAADG9OzPB1hYnAACAvwAAAAAAAIC/Mb07szG9O7MAAAAAaTwGtBe3UTgA1yO8AACAPwAAAAAAAKA/AAAAAAAAAAAAAKA/AACgPwAAIEAAAKA/AACAP+NXZBbjV2SW2w/JPwAAgD9OiQsX41dklvLTRj9DkASkE2gxJQAAgL/bD8k/KBXpvigV6b5q40O/yerqPw==';
            gltfUtilities.loadArrayBuffer(dataUri, handleSuccess, handleError);

            waitsFor(successOrError);

            runs(function() {
                expect(result).toBeDefined();
                expect(error).not.toBeDefined();

                expect(result.byteLength).toBeGreaterThan(0);
            });
        });

        it('can load a cross-origin arraybuffer', function() {
            // wikimedia sets the CORS header on their images
            gltfUtilities.loadArrayBuffer('http://upload.wikimedia.org/wikipedia/en/b/bc/Wiki.png', handleSuccess, handleError);

            waitsFor(successOrError);

            runs(function() {
                expect(result).toBeDefined();
                expect(error).not.toBeDefined();

                expect(result.byteLength).toBeGreaterThan(0);
            });
        });

        it('can load text', function() {
            gltfUtilities.loadText('./testdata/test.glsl', handleSuccess, handleError);

            waitsFor(successOrError);

            runs(function() {
                expect(result).toBeDefined();
                expect(error).not.toBeDefined();

                expect(result).toContain('gl_FragColor = vec4(1.0);');
            });
        });

        it('can load text from a base64-encoded data uri', function() {
            // encoded version of test.glsl
            var dataUri = 'data:;base64,dm9pZCBtYWluKCkgDQp7IA0KICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoMS4wKTsgDQp9';
            gltfUtilities.loadText(dataUri, handleSuccess, handleError);

            waitsFor(successOrError);

            runs(function() {
                expect(result).toBeDefined();
                expect(error).not.toBeDefined();

                expect(result).toContain('gl_FragColor = vec4(1.0);');
            });
        });

        it('can load text from a uri-encoded data uri', function() {
            // encoded version of test.glsl
            var dataUri = 'data:,void%20main()%20%0A%7B%20%0A%20%20%20%20gl_FragColor%20%3D%20vec4(1.0)%3B%20%0A%7D';
            gltfUtilities.loadText(dataUri, handleSuccess, handleError);

            waitsFor(successOrError);

            runs(function() {
                expect(result).toBeDefined();
                expect(error).not.toBeDefined();

                expect(result).toContain('gl_FragColor = vec4(1.0);');
            });
        });

        it('can load cross-origin text', function() {
            // MDN sets the CORS header
            gltfUtilities.loadText('https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS', handleSuccess, handleError);

            waitsFor(successOrError);

            runs(function() {
                expect(result).toBeDefined();
                expect(error).not.toBeDefined();

                expect(result.length).toBeGreaterThan(0);
            });
        });
    });
})();