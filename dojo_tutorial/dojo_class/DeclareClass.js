require(["dojo/_base/declare"], function (declare) {

    /**
     * 形状类
     */
    declare("myApp.examples.Shape", // 类名
        null, // 无父类，使用null
        {
            color: 0,
            setColor: function (color) {
                this.color = color;
            }
        }
    );


    // 圆
    declare("myApp.examples.Circle",
        myApp.examples.Shape, // 继承自Shape
        {
            radius: 0,
            // 执行 new Circle 时的构造函数
            constructor: function (radius) {
                this.radius = radius || this.radius;
            },
            setRadius: function (radius) {
                this.radius = radius;
            },
            area: function () {
                return Math.PI * this.radius * this.radius;
            }
        }
    );
    // 矩形
    declare("myApp.examples.Rectangle",
        myApp.examples.Shape, // 继承自 Shape
        {
            length: 0,
            width: 0,
            constructor: function (length, width) {
                this.length = length || this.length;
                this.width = width || this.width;
            },
            setLength: function (l) {
                this.length = l;
            },
            setWidth: function (w) {
                this.width = w;
            },
            area: function () {
                return this.length * this.width;
            }
        }
    );

    /**
     *  位置类
     */
    declare("myApp.examples.Position",
        null,
        {
            x: 0,
            y: 0,
            constructor: function (x, y) {
                this.x = x || this.x;
                this.y = y || this.y;
            },
            setPosition: function (x, y) {
                this.x = x || this.x;
                this.y = y || this.y;
            },
            move: function (x, y) {
                this.x += x;
                this.y += y;
            }
        }
    );
    /**
     *  使用 Mixin 实现多继承
     */

    declare("myApp.examples.PositionedCircle",
        [myApp.examples.Circle, myApp.examples.Position],
        {
            constructor: function (radius, x, y) {
                this.setPosition(x, y)
            }
        }
    );


});