(function (window) {
    function Point(element, number, numberTotal) {
        this.angle = 0;
        this.element = element;
        this.width = element.offsetWidth;
        this.height = element.offsetHeight;

        this.setAngle = function (newAngle) {
            newAngle %= 2 * Math.PI;
            if (newAngle < -Math.PI) {
                newAngle += 2 * Math.PI;
            }
            else if (newAngle >= Math.PI) {
                newAngle -= 2 * Math.PI;
            }

            this.angle = newAngle;
        };

        this.setAngle(2 * Math.PI * number / numberTotal);
    }

    function positionX(angle) {
        return 2 * sqrtK * Math.sin(angle) / (k + 1 - (k - 1) * Math.cos(angle));
    }

    function positionY(positionX, angle) {
        var sign = -1;

        if (Math.abs(angle) < breakAngle) {
            sign = 1;
        }

        return sign * Math.sqrt(1 - positionX * positionX);
    }

    function sizeFactor(angle) {
        return 2 / (k - 1) / Math.sqrt(1 - 2 * kStar * Math.cos(angle) + kStar * kStar);
    }

    function updatePoints() {
        var point, x, y, size, angle, width, height;

        for (var i = 0; i < points.length; i++) {
            point = points[i];
            angle = Math.round(point.angle * 100);

            if (!pointCache.hasOwnProperty(angle)) {
                console.log(angle);
                return;
            }

            x = pointCache[angle][0];
            y = pointCache[angle][1];
            size = pointCache[angle][2];

            width = point.width * size;
            height = point.height * size;

            point.element.style.width = width + 'px';
            point.element.style.height = height + 'px';
            point.element.style.marginTop = ellipse.center.y + y - height / 2 + 'px';
            point.element.style.marginLeft = ellipse.center.x + x - width / 2 + 'px';

            point.element.style.zIndex = pointCache[angle][3];
        }
    }

    function rotate(timeDiff) {
        if (speed < .01) {
            window.clearInterval(interval);
            lastInterval = 0;

            return;
        }

        for (var i = 0; i < points.length; i++) {
            var point = points[i];

            point.setAngle(point.angle + rotationDirection * speed * timeDiff);
        }

        updatePoints();

        speed += acceleration * timeDiff;
    }

    function addInterval() {
        if (interval !== lastInterval) {
            interval = window.setInterval(function () {
                rotate(.05);
            }, 50);

            lastInterval = interval;
        }
    }

    var carousel, children, k, sqrtK, kStar, breakAngle, maxSpeed, speed, acceleration,
        rotationDirection, interval, lastInterval, points, ellipse, pointCache, descriptionTag;

    window.run = function (element) {
        carousel = element;
        children = carousel.querySelectorAll('ul > li > a');
        descriptionTag = carousel.querySelector('.description');
        k = 1 * carousel.dataset.ratio;
        sqrtK = Math.sqrt(k);
        kStar = (k + 1) / (k - 1);
        breakAngle = Math.acos(1 / kStar);
        maxSpeed = 1 * carousel.dataset.maxSpeed;
        speed = maxSpeed;
        acceleration = 1 * carousel.dataset.acceleration;
        rotationDirection = 1;
        lastInterval = -1;
        points = [];
        pointCache = {};
        ellipse = {
            width: carousel.offsetWidth * (1 - carousel.dataset.paddingLeft - carousel.dataset.paddingRight),
            height: carousel.offsetHeight * (1 - carousel.dataset.paddingTop - carousel.dataset.paddingBottom),
            center: {
                x: carousel.offsetWidth * (1 + carousel.dataset.paddingLeft - carousel.dataset.paddingRight) / 2,
                y: carousel.offsetHeight * (1 + carousel.dataset.paddingTop - carousel.dataset.paddingBottom) / 2
            }
        };

        for (var i = 0, max = children.length; i < max; i++) {
            var child = children[i];

            if (!child.classList.contains('skip')) {
                points.push(new Point(child, i, children.length - 1));

                child.addEventListener('mouseover', function (event) {
                    descriptionTag.innerHTML = event.target.innerHTML;
                    descriptionTag.classList.add('show');
                });

                child.addEventListener('mouseout', function () {
                    descriptionTag.classList.remove('show');
                });
            }
        }

        var pi = Math.ceil(100 * Math.PI), angle, x;

        for (var j = -pi; j <= pi; j++) {
            angle = j / 100;
            x = positionX(angle);
            pointCache[j] = [
                ellipse.width * x / 2,
                ellipse.height * positionY(x, angle) / 2,
                sizeFactor(angle),
                pi - Math.abs(j)
            ];
        }

        carousel.addEventListener('mousemove', function (event) {
            var center = carousel.offsetLeft + carousel.offsetWidth / 2;

            speed = -maxSpeed * 2 * (event.clientX - center) / carousel.offsetWidth;

            if (speed < 0) {
                rotationDirection = -1;
                speed = -speed;
            }
            else {
                rotationDirection = 1;
            }
        });

        carousel.addEventListener('mouseover', function () {
            addInterval();
            acceleration = 0;
        });

        carousel.addEventListener('mouseout', function () {
            acceleration = 1 * carousel.dataset.acceleration;
        });

        descriptionTag.classList.remove('show');

        updatePoints();
        addInterval();
    }
})(window);
