
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

// code for bounding in which text move up and down by animation.
function firstpageAnim(){
    var t1 = gsap.timeline();

    t1.from("#nav", { // animation from top to up
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
    .to(".boundingelem", {  //  animation from bottom to up, (to is for bottom to top)
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: .2
    })
    .from("#herofooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    })
    // .from("#herofooter", {   // from left to right// 
    //     x: -10,
    //     opacity: 0,
    //     duration: 1.5,
    //     delay: -1,
    //     ease: Expo.easeInOut
    // })
}

var timeout;
function circleChaptakaro(){  // code for the adjustment of corcle that move with curser. //
    // define default scale value
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dets){
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY

        circleMouseFollower(xscale, yscale);

        timeout = setTimeout(function (){
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100);
    });
}


// code for circle that move with curser. //
function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove", function (dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
}

firstpageAnim();
circleChaptakaro();
circleMouseFollower();


// code for elem i which we have to show the images in it as animated with curser move.

// document.querySelectorAll(".elem").forEach(function (elem) {
//     elem.addEventListener("mousemove", function (details){
//         gsap.to(elem.querySelector("img"), {
//             opacity: 1,
//             ease: Power1,
//         });
//     });
// });

// document.querySelectorAll(".elem").forEach(function (elem){
//     elem.addEventListener("mousemove", function (dets) {

//         gsap.to(elem.querySelector("img"), {
//             opacity: 1,
//             ease: Power1,
//         });
//     });
// });

document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;
  
    elem.addEventListener("mouseleave", function (dets) {
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
      });
    });
  
    elem.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - elem.getBoundingClientRect().top;
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;
      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
      });
    });
  });

