(function(window){
    function point(element, number, numberTotal)
    {
        this.angle = 0;
        this.element = element;
        this.width = element.offsetWidth;
        this.height = element.offsetHeight;
        
        this.setAngle = function(newAngle)
        {
            newAngle %= 2 * Math.PI;
            if(newAngle < -Math.PI)
            {
                newAngle += 2*Math.PI;
            }
            else if(newAngle >= Math.PI)
            {
                newAngle -= 2*Math.PI;
            }
            
            this.angle = newAngle;
        }
        
        this.setAngle(2 * Math.PI * number / numberTotal);
    }

    function positionX(angle)
    {
        return 2*sqrtK*Math.sin(angle)/(k + 1 - (k - 1) * Math.cos(angle));
    }

    function positionY(positionX, angle)
    {
        var sign = -1;
        
        if(Math.abs(angle) < breakAngle)
        {
            sign = 1;
        }
        
        return sign * Math.sqrt(1 - positionX * positionX);
    }

    function sizeFactor(angle)
    {
        return 2/(k-1)/Math.sqrt(1-2*kStar*Math.cos(angle)+kStar*kStar);
    }

    function updatePoints()
    {
        var point, x, y, size, angle, width, height;
        
        for(i in points)
        {
            point = points[i];
            angle = Math.round(point.angle * 100);
            
            if(!pointCache.hasOwnProperty(angle))
            {
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

    function rotate(timeDiff)
    {
        if(speed < .01)
        {
            window.clearInterval(interval);
            lastInterval = 0;
            
            return;
        }
        
        for(i in points)
        {
            var point = points[i];
            
            point.setAngle(point.angle + rotationDirection * speed * timeDiff);
        }
        
        updatePoints();
        
        speed += acceleration*timeDiff;
    }

    function addInterval()
    {
        if(interval != lastInterval)
        {
            interval = window.setInterval(function()
            {
                rotate(.05);
            }, 50);
            
            lastInterval = interval;
        }
    }

    var carrousel, k, sqrtK, kStar, breakAngle, maxSpeed, speed, acceleration,
        rotationDirection, interval, lastInterval, points, ellipse, pointCache, descriptionTag;

    window.run = function(id)
    {
        carrousel = document.getElementById(id);
        k = 1*carrousel.dataset.ratio;
        sqrtK = Math.sqrt(k);
        kStar = (k + 1)/(k - 1);
        breakAngle = Math.acos(1/kStar);
        maxSpeed = 1*carrousel.dataset.maxSpeed;
        speed = maxSpeed;
        acceleration = 1*carrousel.dataset.acceleration;
        rotationDirection = 1;
        lastInterval = -1;
        points = [];
        pointCache = {};
        ellipse = {
            width: carrousel.offsetWidth * (1 - carrousel.dataset.paddingLeft - carrousel.dataset.paddingRight),
            height: carrousel.offsetHeight * (1 - carrousel.dataset.paddingTop - carrousel.dataset.paddingBottom),
            center: {
                x: carrousel.offsetWidth * (1 + carrousel.dataset.paddingLeft - carrousel.dataset.paddingRight)/2,
                y: carrousel.offsetHeight * (1 + carrousel.dataset.paddingTop - carrousel.dataset.paddingBottom)/2
            }
        };
    
        for(var i = 0, max = carrousel.children.length; i < max; i++)
        {
            var child = carrousel.children[i];
            
            if(!child.classList.contains('skip'))
            {
                points.push(new point(child, i, carrousel.children.length - 1));
                
                child.addEventListener('mouseover', function(event)
                {
                    descriptionTag.innerHTML = event.target.innerHTML;
                    descriptionTag.classList.add('show');
                });
                
                child.addEventListener('mouseout', function(event)
                {
                    descriptionTag.classList.remove('show');
                });
            }
            else if(child.classList.contains('description'))
            {
                descriptionTag = child;
                child.classList.add('show');
            }
        }
        
        var pi = Math.ceil(100 * Math.PI), angle, x;
        
        for(var i = -pi; i <= pi; i++)
        {
            angle = i / 100;
            x = positionX(angle);
            pointCache[i] = [
                ellipse.width * x / 2,
                ellipse.height * positionY(x, angle) / 2,
                sizeFactor(angle),
                pi - Math.abs(i)
            ];
        }
    
        carrousel.addEventListener('mousemove', function(event)
        {
            var center = carrousel.offsetLeft + carrousel.offsetWidth/2;
            
            speed = -maxSpeed * 2 * (event.clientX - center)/carrousel.offsetWidth;
            
            if(speed < 0)
            {
                rotationDirection = -1;
                speed = -speed;
            }
            else
            {
                rotationDirection = 1;
            }
        });
        
        carrousel.addEventListener('mouseover', function()
        {
            addInterval();
            acceleration = 0;
        });

        carrousel.addEventListener('mouseout', function()
        {
            acceleration = 1*carrousel.dataset.acceleration;
        });

        carrousel.classList.add('js');
        
        descriptionTag.classList.remove('show');

        updatePoints();
        addInterval();
    }
})(window);

run('carrousel');