import $ from 'jquery';
import slick from 'slick-carousel';
import fancybox from "@fancyapps/fancybox";
import PerfectScrollbar from 'perfect-scrollbar';

// SVG
import svg4everybody from "svg4everybody";
svg4everybody();

// Scrolll
try {
	const ps = new PerfectScrollbar('#container');
} catch (e) {
	console.log(e);
}

// Slick
$(".carousel").slick();

