(function () {
    var _fillText,
        __slice = [].slice;

    _fillText = CanvasRenderingContext2D.prototype.fillText;

    CanvasRenderingContext2D.prototype.fillText = function () {
        var args, offset, previousLetter, str, x, y,
            _this = this;

        str = arguments[0], x = arguments[1], y = arguments[2], args = 4 <= arguments.length ? __slice.call(arguments, 3) : [];
        if (this.letterSpacing == null || this.letterSpacing === 0) {
            return _fillText.apply(this, arguments);
        }
        offset = 0;
        previousLetter = false;
        return str.split('').forEach(function (letter) {
            _fillText.apply(_this, [letter, x + offset + _this.letterSpacing, y].concat(args));
            offset += _this.measureText(letter).width + _this.letterSpacing;
            return previousLetter = letter;
        });
    };
})();