(function ($) {
    "use strict";
    
    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 30
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Typed Initiate
    if ($('.header h2').length == 1) {
        var typed_strings = $('.header .typed-text').text();
        var typed = new Typed('.header h2', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }
    
    
    // Skills
    $('.skills').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});
    
    
    // Porfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
    
    // Review slider
    $('.review-slider').slick({
        autoplay: true,
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
})(jQuery);

// Clock functions
function displayTime() {
    document.getElementById('digit-clock').textContent = "Current time: " + new Date().toLocaleString();
}

function drawAnalogClock() {
    function drawAnalogClock() {
    var canvas = document.getElementById('analog-clock');
    var ctx = canvas.getContext("2d");
    var radius = canvas.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.90;
    
    // Draw clock face
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    
    // Draw clock center
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
    
    // Draw hour marks
    for (let num = 1; num <= 12; num++) {
        let angle = num * Math.PI / 6;
        ctx.rotate(angle);
        ctx.moveTo(0, -radius * 0.85);
        ctx.lineTo(0, -radius * 0.95);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = radius * 0.02;
        ctx.stroke();
        ctx.rotate(-angle);
    }
    
    // Get current time
    let now = new Date();
    let hour = now.getHours() % 12;
    let minute = now.getMinutes();
    let second = now.getSeconds();
    
    // Draw hour hand
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    
    // Draw minute hand
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.8, radius * 0.07);
    
    // Draw second hand
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}
    // ... (keep the existing drawAnalogClock function)
}

// Cookie functions
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim());
        if (cookieName === name) return cookieValue;
    }
    return null;
}

function displayWelcomeMessage() {
    const lastVisit = getCookie("lastVisit");
    const message = lastVisit 
        ? `Welcome back! Your last visit was ${lastVisit}`
        : "Welcome to my homepage!";
    alert(message);
    setCookie("lastVisit", new Date().toLocaleString(), 30);
}

// Initialize all functionalities
$(document).ready(function() {
    setInterval(displayTime, 1000);
    setInterval(drawAnalogClock, 1000);
    displayWelcomeMessage();
    fetchData();
    fetchChuckNorrisJoke();

    $('#email').on('click', function() {
        const emailElement = $(this);
        if (emailElement.text() === "Show my Email") {
            emailElement.html('<a href="mailto:chimalpy@ucmail.uc.edu">chimalpy@ucmail.uc.edu</a>');
        } else {
            emailElement.text("Show my Email");
        }
    });
});

async function fetchData() {
    const url = 'https://quotes15.p.rapidapi.com/quotes/random/';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '76d3917378mshff568fed8e12a08p136191jsnb9cb215f94ac',
            'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const quoteContainer = document.getElementById('quoteContainer');
        quoteContainer.innerHTML = `<p>${result.content} - ${result.originator.name}</p>`;
    } catch (error) {
        console.error(error);
    }
}

fetchData();

async function fetchData() {
    const url = 'https://quotes15.p.rapidapi.com/quotes/random/';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '76d3917378mshff568fed8e12a08p136191jsnb9cb215f94ac',
            'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const quoteContainer = document.getElementById('quoteContainer');
        quoteContainer.innerHTML = `<p>${result.content} - ${result.originator.name}</p>`;
    } catch (error) {
        console.error('Error fetching quote:', error);
        document.getElementById('quoteContainer').innerHTML = '<p>Failed to load quote. Please try again later.</p>';
    }
}

async function fetchChuckNorrisJoke() {
    const url = 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-RapidAPI-Key': '76d3917378mshff568fed8e12a08p136191jsnb9cb215f94ac',
            'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const jokeContainer = document.getElementById('jokeContainer');
        jokeContainer.innerHTML = `<p>${result.value}</p>`;
    } catch (error) {
        console.error('Error fetching joke:', error);
        document.getElementById('jokeContainer').innerHTML = '<p>Failed to load joke. Please try again later.</p>';
    }
}

/*async function fetchChuckNorrisJoke() {
    const url = 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'X-RapidAPI-Key': '76d3917378mshff568fed8e12a08p136191jsnb9cb215f94ac',
            'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const jokeContainer = document.getElementById('jokeContainer');
        jokeContainer.innerHTML = `<p>${result.value}</p>`;
    } catch (error) {
        console.error(error);
    }
}

fetchChuckNorrisJoke();/*
