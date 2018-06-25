'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var isNumber = _interopDefault(require('lodash/isNumber'));
var isPlainObject = _interopDefault(require('lodash/isPlainObject'));
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));

var DIRECTION_ROW = 'row';
var DIRECTION_COLUMN = 'column';

var ANCHOR_TOP = 'top';
var ANCHOR_TOP_RIGHT = 'top-right';
var ANCHOR_RIGHT = 'right';
var ANCHOR_BOTTOM_RIGHT = 'bottom-right';
var ANCHOR_BOTTOM = 'bottom';
var ANCHOR_BOTTOM_LEFT = 'bottom-left';
var ANCHOR_LEFT = 'left';
var ANCHOR_TOP_LEFT = 'top-left';
var ANCHOR_CENTER = 'center';

var DIRECTION_LEFT_TO_RIGHT = 'left-to-right';
var DIRECTION_RIGHT_TO_LEFT = 'right-to-left';
var DIRECTION_TOP_TO_BOTTOM = 'top-to-bottom';
var DIRECTION_BOTTOM_TO_TOP = 'bottom-to-top';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};









var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var zeroPadding = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
};

var computeDimensions = function computeDimensions(_ref) {
    var itemCount = _ref.itemCount,
        itemWidth = _ref.itemWidth,
        itemHeight = _ref.itemHeight,
        direction = _ref.direction,
        itemsSpacing = _ref.itemsSpacing,
        _padding = _ref.padding;

    var padding = void 0;
    if (isNumber(_padding)) {
        padding = {
            top: _padding,
            right: _padding,
            bottom: _padding,
            left: _padding
        };
    } else if (isPlainObject(_padding)) {
        padding = _extends({}, zeroPadding, _padding);
    } else {
        throw new TypeError('Invalid property padding, must be one of: number, object');
    }

    var horizontalPadding = padding.left + padding.right;
    var verticalPadding = padding.top + padding.bottom;
    var width = itemWidth + horizontalPadding;
    var height = itemHeight + verticalPadding;
    var spacing = (itemCount - 1) * itemsSpacing;
    if (direction === DIRECTION_ROW) {
        width = itemWidth * itemCount + spacing + horizontalPadding;
    } else if (direction === DIRECTION_COLUMN) {
        height = itemHeight * itemCount + spacing + verticalPadding;
    }

    return { width: width, height: height, padding: padding };
};

var computePositionFromAnchor = function computePositionFromAnchor(_ref2) {
    var anchor = _ref2.anchor,
        translateX = _ref2.translateX,
        translateY = _ref2.translateY,
        containerWidth = _ref2.containerWidth,
        containerHeight = _ref2.containerHeight,
        width = _ref2.width,
        height = _ref2.height;

    var x = translateX;
    var y = translateY;

    switch (anchor) {
        case ANCHOR_TOP:
            x += (containerWidth - width) / 2;
            break;

        case ANCHOR_TOP_RIGHT:
            x += containerWidth - width;
            break;

        case ANCHOR_RIGHT:
            x += containerWidth - width;
            y += (containerHeight - height) / 2;
            break;

        case ANCHOR_BOTTOM_RIGHT:
            x += containerWidth - width;
            y += containerHeight - height;
            break;

        case ANCHOR_BOTTOM:
            x += (containerWidth - width) / 2;
            y += containerHeight - height;
            break;

        case ANCHOR_BOTTOM_LEFT:
            y += containerHeight - height;
            break;

        case ANCHOR_LEFT:
            y += (containerHeight - height) / 2;
            break;

        case ANCHOR_CENTER:
            x += (containerWidth - width) / 2;
            y += (containerHeight - height) / 2;
            break;
    }

    return { x: x, y: y };
};

var computeItemLayout = function computeItemLayout(_ref3) {
    var direction = _ref3.direction,
        justify = _ref3.justify,
        symbolSize = _ref3.symbolSize,
        symbolSpacing = _ref3.symbolSpacing,
        width = _ref3.width,
        height = _ref3.height;

    var symbolX = void 0;
    var symbolY = void 0;

    var labelX = void 0;
    var labelY = void 0;
    var labelAnchor = void 0;
    var labelAlignment = void 0;

    switch (direction) {
        case DIRECTION_LEFT_TO_RIGHT:
            symbolX = 0;
            symbolY = (height - symbolSize) / 2;

            labelY = height / 2;
            labelAlignment = 'middle';
            if (justify === true) {
                labelX = width;
                labelAnchor = 'end';
            } else {
                labelX = symbolSize + symbolSpacing;
                labelAnchor = 'start';
            }
            break;

        case DIRECTION_RIGHT_TO_LEFT:
            symbolX = width - symbolSize;
            symbolY = (height - symbolSize) / 2;

            labelY = height / 2;
            labelAlignment = 'middle';
            if (justify === true) {
                labelX = 0;
                labelAnchor = 'start';
            } else {
                labelX = width - symbolSize - symbolSpacing;
                labelAnchor = 'end';
            }
            break;

        case DIRECTION_TOP_TO_BOTTOM:
            symbolX = (width - symbolSize) / 2;
            symbolY = 0;

            labelX = width / 2;

            labelAnchor = 'middle';
            if (justify === true) {
                labelY = height;
                labelAlignment = 'baseline';
            } else {
                labelY = symbolSize + symbolSpacing;
                labelAlignment = 'hanging';
            }
            break;

        case DIRECTION_BOTTOM_TO_TOP:
            symbolX = (width - symbolSize) / 2;
            symbolY = height - symbolSize;

            labelX = width / 2;
            labelAnchor = 'middle';
            if (justify === true) {
                labelY = 0;
                labelAlignment = 'hanging';
            } else {
                labelY = height - symbolSize - symbolSpacing;
                labelAlignment = 'baseline';
            }
            break;
    }

    return {
        symbolX: symbolX,
        symbolY: symbolY,

        labelX: labelX,
        labelY: labelY,
        labelAnchor: labelAnchor,
        labelAlignment: labelAlignment
    };
};

var SymbolCircle = function SymbolCircle(_ref) {
    var x = _ref.x,
        y = _ref.y,
        size = _ref.size,
        fill = _ref.fill;
    return React__default.createElement('circle', { r: size / 2, cx: x + size / 2, cy: y + size / 2, fill: fill });
};

SymbolCircle.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    fill: PropTypes.string.isRequired
};

var SymbolDiamond = function SymbolDiamond(_ref) {
    var x = _ref.x,
        y = _ref.y,
        size = _ref.size,
        fill = _ref.fill;

    return React__default.createElement(
        'g',
        { transform: 'translate(' + x + ',' + y + ')' },
        React__default.createElement('path', {
            fill: fill,
            d: '\n                    M' + size / 2 + ' 0\n                    L' + size * 0.8 + ' ' + size / 2 + '\n                    L' + size / 2 + ' ' + size + '\n                    L' + size * 0.2 + ' ' + size / 2 + '\n                    L' + size / 2 + ' 0\n                '
        })
    );
};

SymbolDiamond.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    fill: PropTypes.string.isRequired
};

var SymbolSquare = function SymbolSquare(_ref) {
    var x = _ref.x,
        y = _ref.y,
        size = _ref.size,
        fill = _ref.fill;
    return React__default.createElement('rect', { x: x, y: y, fill: fill, width: size, height: size });
};

SymbolSquare.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    fill: PropTypes.string.isRequired
};

var SymbolTriangle = function SymbolTriangle(_ref) {
    var x = _ref.x,
        y = _ref.y,
        size = _ref.size,
        fill = _ref.fill;
    return React__default.createElement(
        'g',
        { transform: 'translate(' + x + ',' + y + ')' },
        React__default.createElement('path', {
            fill: fill,
            d: '\n                M' + size / 2 + ' 0\n                L' + size + ' ' + size + '\n                L0 ' + size + '\n                L' + size / 2 + ' 0\n            '
        })
    );
};

SymbolTriangle.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    fill: PropTypes.string.isRequired
};

var symbolByShape = {
    circle: SymbolCircle,
    diamond: SymbolDiamond,
    square: SymbolSquare,
    triangle: SymbolTriangle
};

var LegendSvgItem = function (_Component) {
    inherits(LegendSvgItem, _Component);

    function LegendSvgItem() {
        classCallCheck(this, LegendSvgItem);
        return possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    LegendSvgItem.prototype.render = function render() {
        var _props = this.props,
            x = _props.x,
            y = _props.y,
            width = _props.width,
            height = _props.height,
            symbolSize = _props.symbolSize,
            symbolSpacing = _props.symbolSpacing,
            symbolShape = _props.symbolShape,
            label = _props.label,
            fill = _props.fill,
            textColor = _props.textColor,
            direction = _props.direction,
            justify = _props.justify;

        var _computeItemLayout = computeItemLayout({
            direction: direction,
            justify: justify,
            symbolSize: symbolSize,
            symbolSpacing: symbolSpacing,
            width: width,
            height: height
        }),
            symbolX = _computeItemLayout.symbolX,
            symbolY = _computeItemLayout.symbolY,
            labelX = _computeItemLayout.labelX,
            labelY = _computeItemLayout.labelY,
            labelAnchor = _computeItemLayout.labelAnchor,
            labelAlignment = _computeItemLayout.labelAlignment;

        var Symbol = symbolByShape[symbolShape];

        return React__default.createElement(
            'g',
            { transform: 'translate(' + x + ',' + y + ')' },
            React__default.createElement(Symbol, { x: symbolX, y: symbolY, size: symbolSize, fill: fill }),
            React__default.createElement(
                'text',
                {
                    textAnchor: labelAnchor,
                    style: { fill: textColor, alignmentBaseline: labelAlignment },
                    x: labelX,
                    y: labelY
                },
                label
            )
        );
    };

    return LegendSvgItem;
}(React.Component);

LegendSvgItem.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,

    symbolSize: PropTypes.number.isRequired,
    symbolSpacing: PropTypes.number.isRequired,
    symbolShape: PropTypes.oneOfType([PropTypes.oneOf(Object.keys(symbolByShape)), PropTypes.func]).isRequired,

    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    fill: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,

    direction: PropTypes.oneOf([DIRECTION_LEFT_TO_RIGHT, DIRECTION_RIGHT_TO_LEFT, DIRECTION_TOP_TO_BOTTOM, DIRECTION_BOTTOM_TO_TOP]).isRequired,
    justify: PropTypes.bool.isRequired
};
LegendSvgItem.defaultProps = {
    direction: DIRECTION_LEFT_TO_RIGHT,
    justify: false,
    symbolSize: 16,
    symbolSpacing: 8,
    symbolShape: 'square'
};

var LegendSvg = function LegendSvg(_ref) {
    var data = _ref.data,
        x = _ref.x,
        y = _ref.y,
        direction = _ref.direction,
        _padding = _ref.padding,
        justify = _ref.justify,
        itemWidth = _ref.itemWidth,
        itemHeight = _ref.itemHeight,
        itemDirection = _ref.itemDirection,
        itemsSpacing = _ref.itemsSpacing,
        symbolSize = _ref.symbolSize,
        symbolSpacing = _ref.symbolSpacing,
        symbolShape = _ref.symbolShape,
        textColor = _ref.textColor;

    // eslint-disable-next-line no-unused-vars
    var _computeDimensions = computeDimensions({
        itemCount: data.length,
        itemWidth: itemWidth,
        itemHeight: itemHeight,
        itemsSpacing: itemsSpacing,
        direction: direction,
        padding: _padding
    }),
        width = _computeDimensions.width,
        height = _computeDimensions.height,
        padding = _computeDimensions.padding;

    var xStep = 0;
    var yStep = 0;
    if (direction === DIRECTION_ROW) {
        xStep = itemWidth + itemsSpacing;
    } else if (direction === DIRECTION_COLUMN) {
        yStep = itemHeight + itemsSpacing;
    }

    return React__default.createElement(
        'g',
        { transform: 'translate(' + x + ',' + y + ')' },
        data.map(function (_ref2, i) {
            var label = _ref2.label,
                fill = _ref2.fill;
            return React__default.createElement(LegendSvgItem, {
                key: i,
                x: i * xStep + padding.left,
                y: i * yStep + padding.top,
                width: itemWidth,
                height: itemHeight,
                symbolSize: symbolSize,
                symbolSpacing: symbolSpacing,
                symbolShape: symbolShape,
                direction: itemDirection,
                justify: justify,
                label: label,
                fill: fill,
                textColor: textColor
            });
        })
    );
};

LegendSvg.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        fill: PropTypes.string.isRequired
    })).isRequired,

    // position/layout
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    direction: PropTypes.oneOf([DIRECTION_COLUMN, DIRECTION_ROW]).isRequired,
    padding: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
        top: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number
    })]).isRequired,
    justify: PropTypes.bool.isRequired,

    // items
    itemWidth: PropTypes.number.isRequired,
    itemHeight: PropTypes.number.isRequired,
    itemDirection: PropTypes.oneOf([DIRECTION_LEFT_TO_RIGHT, DIRECTION_RIGHT_TO_LEFT, DIRECTION_TOP_TO_BOTTOM, DIRECTION_BOTTOM_TO_TOP]).isRequired,
    itemsSpacing: PropTypes.number.isRequired,
    symbolSize: PropTypes.number,
    symbolSpacing: PropTypes.number,
    symbolShape: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    textColor: PropTypes.string.isRequired,

    // interactivity
    onClick: PropTypes.func.isRequired
};

LegendSvg.defaultProps = {
    // position/layout
    padding: 0,
    justify: false,

    // items
    itemDirection: DIRECTION_LEFT_TO_RIGHT,
    itemsSpacing: 0,
    textColor: 'black',

    // interactivity
    onClick: function onClick() {}
};

var BoxLegendSvg = function BoxLegendSvg(_ref) {
    var data = _ref.data,
        containerWidth = _ref.containerWidth,
        containerHeight = _ref.containerHeight,
        translateX = _ref.translateX,
        translateY = _ref.translateY,
        anchor = _ref.anchor,
        direction = _ref.direction,
        padding = _ref.padding,
        justify = _ref.justify,
        itemWidth = _ref.itemWidth,
        itemHeight = _ref.itemHeight,
        itemDirection = _ref.itemDirection,
        itemsSpacing = _ref.itemsSpacing,
        symbolSize = _ref.symbolSize,
        symbolSpacing = _ref.symbolSpacing,
        symbolShape = _ref.symbolShape,
        textColor = _ref.textColor;

    var _computeDimensions = computeDimensions({
        itemCount: data.length,
        itemWidth: itemWidth,
        itemHeight: itemHeight,
        itemsSpacing: itemsSpacing,
        direction: direction,
        padding: padding
    }),
        width = _computeDimensions.width,
        height = _computeDimensions.height;

    var _computePositionFromA = computePositionFromAnchor({
        anchor: anchor,
        translateX: translateX,
        translateY: translateY,
        containerWidth: containerWidth,
        containerHeight: containerHeight,
        width: width,
        height: height
    }),
        x = _computePositionFromA.x,
        y = _computePositionFromA.y;

    return React__default.createElement(LegendSvg, {
        data: data,
        x: x,
        y: y,
        direction: direction,
        padding: padding,
        justify: justify,
        itemWidth: itemWidth,
        itemHeight: itemHeight,
        itemDirection: itemDirection,
        itemsSpacing: itemsSpacing,
        symbolSize: symbolSize,
        symbolSpacing: symbolSpacing,
        symbolShape: symbolShape,
        textColor: textColor
    });
};

BoxLegendSvg.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        fill: PropTypes.string.isRequired
    })).isRequired,
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired,
    translateX: PropTypes.number.isRequired,
    translateY: PropTypes.number.isRequired,
    anchor: PropTypes.oneOf([ANCHOR_TOP, ANCHOR_TOP_RIGHT, ANCHOR_RIGHT, ANCHOR_BOTTOM_RIGHT, ANCHOR_BOTTOM, ANCHOR_BOTTOM_LEFT, ANCHOR_LEFT, ANCHOR_TOP_LEFT, ANCHOR_CENTER]).isRequired,
    direction: PropTypes.oneOf([DIRECTION_ROW, DIRECTION_COLUMN]).isRequired,
    padding: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
        top: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number
    })]).isRequired,
    justify: PropTypes.bool,

    itemWidth: PropTypes.number.isRequired,
    itemHeight: PropTypes.number.isRequired,
    itemDirection: PropTypes.oneOf([DIRECTION_LEFT_TO_RIGHT, DIRECTION_RIGHT_TO_LEFT, DIRECTION_TOP_TO_BOTTOM, DIRECTION_BOTTOM_TO_TOP]),
    itemsSpacing: PropTypes.number.isRequired,
    symbolSize: PropTypes.number,
    symbolSpacing: PropTypes.number,
    symbolShape: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    textColor: PropTypes.string
};

BoxLegendSvg.defaultProps = {
    translateX: 0,
    translateY: 0,
    itemsSpacing: LegendSvg.defaultProps.itemsSpacing,
    padding: LegendSvg.defaultProps.padding
};

var textPropsMapping = {
    align: {
        start: 'left',
        middle: 'center',
        end: 'right'
    },
    baseline: {
        hanging: 'top',
        middle: 'middle',
        baseline: 'bottom'
    }
};

var renderLegendToCanvas = function renderLegendToCanvas(ctx, _ref) {
    var data = _ref.data,
        containerWidth = _ref.containerWidth,
        containerHeight = _ref.containerHeight,
        _ref$translateX = _ref.translateX,
        translateX = _ref$translateX === undefined ? BoxLegendSvg.defaultProps.translateX : _ref$translateX,
        _ref$translateY = _ref.translateY,
        translateY = _ref$translateY === undefined ? BoxLegendSvg.defaultProps.translateY : _ref$translateY,
        anchor = _ref.anchor,
        direction = _ref.direction,
        _ref$padding = _ref.padding,
        _padding = _ref$padding === undefined ? LegendSvg.defaultProps.padding : _ref$padding,
        _ref$justify = _ref.justify,
        justify = _ref$justify === undefined ? LegendSvgItem.defaultProps.justify : _ref$justify,
        itemWidth = _ref.itemWidth,
        itemHeight = _ref.itemHeight,
        _ref$itemDirection = _ref.itemDirection,
        itemDirection = _ref$itemDirection === undefined ? LegendSvgItem.defaultProps.direction : _ref$itemDirection,
        _ref$itemsSpacing = _ref.itemsSpacing,
        itemsSpacing = _ref$itemsSpacing === undefined ? LegendSvg.defaultProps.itemsSpacing : _ref$itemsSpacing,
        _ref$symbolSize = _ref.symbolSize,
        symbolSize = _ref$symbolSize === undefined ? LegendSvgItem.defaultProps.symbolSize : _ref$symbolSize,
        _ref$symbolSpacing = _ref.symbolSpacing,
        symbolSpacing = _ref$symbolSpacing === undefined ? LegendSvgItem.defaultProps.symbolSpacing : _ref$symbolSpacing,
        _ref$textColor = _ref.textColor,
        textColor = _ref$textColor === undefined ? LegendSvg.defaultProps.textColor : _ref$textColor;

    var _computeDimensions = computeDimensions({
        itemCount: data.length,
        itemWidth: itemWidth,
        itemHeight: itemHeight,
        itemsSpacing: itemsSpacing,
        direction: direction,
        padding: _padding
    }),
        width = _computeDimensions.width,
        height = _computeDimensions.height,
        padding = _computeDimensions.padding;

    var _computePositionFromA = computePositionFromAnchor({
        anchor: anchor,
        translateX: translateX,
        translateY: translateY,
        containerWidth: containerWidth,
        containerHeight: containerHeight,
        width: width,
        height: height
    }),
        x = _computePositionFromA.x,
        y = _computePositionFromA.y;

    var xStep = 0;
    var yStep = 0;
    if (direction === DIRECTION_ROW) {
        xStep = itemWidth + itemsSpacing;
    } else if (direction === DIRECTION_COLUMN) {
        yStep = itemHeight + itemsSpacing;
    }

    ctx.save();
    ctx.translate(x, y);

    data.forEach(function (d, i) {
        var itemX = i * xStep + padding.left;
        var itemY = i * yStep + padding.top;

        var _computeItemLayout = computeItemLayout({
            direction: itemDirection,
            justify: justify,
            symbolSize: symbolSize,
            symbolSpacing: symbolSpacing,
            width: itemWidth,
            height: itemHeight
        }),
            symbolX = _computeItemLayout.symbolX,
            symbolY = _computeItemLayout.symbolY,
            labelX = _computeItemLayout.labelX,
            labelY = _computeItemLayout.labelY,
            labelAnchor = _computeItemLayout.labelAnchor,
            labelAlignment = _computeItemLayout.labelAlignment;

        ctx.fillStyle = d.fill;
        ctx.fillRect(itemX + symbolX, itemY + symbolY, symbolSize, symbolSize);

        ctx.textAlign = textPropsMapping.align[labelAnchor];
        ctx.textBaseline = textPropsMapping.baseline[labelAlignment];
        ctx.fillStyle = textColor;
        ctx.fillText(d.label, itemX + labelX, itemY + labelY);
    });

    ctx.restore();
};

/**
 * The prop type is exported as a simple object instead of `PropTypes.shape`
 * to be able to add extra properties.
 *
 * @example
 * ```javascript
 * import { LegendPropShape } from '@nivo/legends'
 *
 * const customLegendPropType = PropTypes.shape({
 *     ...LegendPropShape,
 *     extra: PropTypes.any.isRequired,
 * })
 * ```
 */
var LegendPropShape = {
    data: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        fill: PropTypes.string.isRequired
    })),

    // position & layout
    anchor: PropTypes.oneOf([ANCHOR_TOP, ANCHOR_TOP_RIGHT, ANCHOR_RIGHT, ANCHOR_BOTTOM_RIGHT, ANCHOR_BOTTOM, ANCHOR_BOTTOM_LEFT, ANCHOR_LEFT, ANCHOR_TOP_LEFT, ANCHOR_CENTER]).isRequired,
    translateX: PropTypes.number,
    translateY: PropTypes.number,
    direction: PropTypes.oneOf([DIRECTION_ROW, DIRECTION_COLUMN]).isRequired,

    // items
    itemWidth: PropTypes.number.isRequired,
    itemHeight: PropTypes.number.isRequired,
    itemDirection: PropTypes.oneOf([DIRECTION_LEFT_TO_RIGHT, DIRECTION_RIGHT_TO_LEFT, DIRECTION_TOP_TO_BOTTOM, DIRECTION_BOTTOM_TO_TOP]),
    itemsSpacing: PropTypes.number,
    symbolSize: PropTypes.number,
    symbolSpacing: PropTypes.number,
    symbolShape: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    textColor: PropTypes.string
};

exports.BoxLegendSvg = BoxLegendSvg;
exports.LegendSvg = LegendSvg;
exports.LegendSvgItem = LegendSvgItem;
exports.renderLegendToCanvas = renderLegendToCanvas;
exports.DIRECTION_ROW = DIRECTION_ROW;
exports.DIRECTION_COLUMN = DIRECTION_COLUMN;
exports.ANCHOR_TOP = ANCHOR_TOP;
exports.ANCHOR_TOP_RIGHT = ANCHOR_TOP_RIGHT;
exports.ANCHOR_RIGHT = ANCHOR_RIGHT;
exports.ANCHOR_BOTTOM_RIGHT = ANCHOR_BOTTOM_RIGHT;
exports.ANCHOR_BOTTOM = ANCHOR_BOTTOM;
exports.ANCHOR_BOTTOM_LEFT = ANCHOR_BOTTOM_LEFT;
exports.ANCHOR_LEFT = ANCHOR_LEFT;
exports.ANCHOR_TOP_LEFT = ANCHOR_TOP_LEFT;
exports.ANCHOR_CENTER = ANCHOR_CENTER;
exports.DIRECTION_LEFT_TO_RIGHT = DIRECTION_LEFT_TO_RIGHT;
exports.DIRECTION_RIGHT_TO_LEFT = DIRECTION_RIGHT_TO_LEFT;
exports.DIRECTION_TOP_TO_BOTTOM = DIRECTION_TOP_TO_BOTTOM;
exports.DIRECTION_BOTTOM_TO_TOP = DIRECTION_BOTTOM_TO_TOP;
exports.LegendPropShape = LegendPropShape;
