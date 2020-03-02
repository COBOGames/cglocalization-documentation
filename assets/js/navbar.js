$(document).ready(function ()
{
//    $("#navbar").html(navbarHtml);
});

var navbarHtml = "<!-- TOGGLE SIDEBAR BUTTON -->\n" +
"            <div id=\"menuButtonWrapper\"\n" +
"                 class=\"menu-button-wrapper navbar-link\"\n" +
"                 onclick=\"showSidebar();\">\n" +
"\n" +
"                <div id=\"menuButton\">\n" +
"                    <div class=\"bar1\"></div>\n" +
"                    <div class=\"bar2\"></div>\n" +
"                    <div class=\"bar3\"></div>\n" +
"                </div>\n" +
"            </div>\n" +
"\n" +
"            <!-- separator -->\n" +
"            <div class=\"navbar-separator\"></div>\n" +
"\n" +
"            <!-- LOGO -->\n" +
"            <img class=\"logo\" src=\"../assets/images/cg-logo.png\" width=\"55\" height=\"55\" alt=\"Logo\"/>\n" +
"            <span class=\"navbar-title\"><b>CGLocalization</b></span>\n" +
"\n" +
"            <!-- LINKS -->\n" +
"            <div id=\"navbarFloatRight\">\n" +
"                <!-- MANUAL -->\n" +
"                <a id=\"manualLink\" class=\"navbar-link\" href=\"../manual/index.html\">\n" +
"                    <span class=\"navbar-link-icon fa-book-open\"></span>\n" +
"                    <span class=\"navbar-link-name\">Manual</span>\n" +
"                </a>\n" +
"\n" +
"                <!-- SCRIPTING-->\n" +
"                <a id=\"scriptingLink\" class=\"navbar-link\" href=\"../scripting/index.html\">\n" +
"                    <span class=\"navbar-link-icon fa-code\"></span>\n" +
"                    <span class=\"navbar-link-name\">Scripting</span>\n" +
"                </a>\n" +
"            </div>\n" +
"\n" +
"            <!-- separator -->\n" +
"            <div class=\"navbar-separator\"></div>\n" +
"\n" +
"            <!-- SEARCH -->\n" +
"            <form class=\"search-container\" action=\"_search.html\" method=\"get\">\n" +
"                <input class=\"search-text-field\" name=\"q\" type=\"text\" placeholder=\"Search...\"/>\n" +
"                <button type=\"submit\" class=\"search-button fa-search\" title=\"Search\"></button>\n" +
"                <!--<button class=\"search-button fa-search\" title=\"Search\"></button>-->\n" +
"            </form>";