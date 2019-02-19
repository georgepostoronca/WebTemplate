// include ../block/**/*.js

// import '../block/*.js';

import "../block/header/header.js";

import $ from 'jquery';
import slick from 'slick-carousel';
import fancybox from "@fancyapps/fancybox";
import PerfectScrollbar from 'perfect-scrollbar';


try {
	const ps = new PerfectScrollbar('#container');
} catch (e) {
	console.log(e);

}


$(".carousel").slick();
