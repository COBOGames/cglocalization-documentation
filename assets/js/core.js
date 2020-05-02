// VARIABLES
const VERSION = 1.2;
var sidebarWrapper;
var closePanel;
var showSidebarButton;
var manualLink;
var scriptingLink;
var isManual;
var hideSidebarPosLeft;
var navbarHeight;
var currentPageLink;

// SEARCH
var txtSidebarSearch;
var btnClearSidebarSearch;
var labelNoSearchResults;
var sidebarElementsGenerated = []; // elements used to search

$(document).ready(function ()
{
    initVariables();
    activateSelectedLinkInNavbar();
    initSearchContainers();
    generateSidebar();
    updateSidebarHeight();
    updateTitles();

    searchInSidebar();
});

$(window).resize(function ()
{
    closePanel.hide();
    showSidebarButton.removeClass("morph-to-x");

    var showSidebar_ = $(window).width() > 600;
    sidebarWrapper.css("left", showSidebar_ ? "0px" : hideSidebarPosLeft);

    updateSidebarHeight();
});

function initVariables()
{
    sidebarWrapper = $(".sidebar-wrapper");
    closePanel = $(".close-sidebar-panel");
    showSidebarButton = $("#menuButton");
    manualLink = $("#manualLink");
    scriptingLink = $("#scriptingLink");
    isManual = location.href.includes("/manual/");
    hideSidebarPosLeft = getCssVariable("--sidebar-hided-pos-left");

    // navbarHeight
    var h = getCssVariable("--navbar-height").replace("px", "");
    navbarHeight = parseInt(h); // parse it to int

    txtSidebarSearch = $("#txtSidebarSearch");
    btnClearSidebarSearch = $("#btnClearSidebarSearch");
    labelNoSearchResults = $("#labelNoSearchResults");

    // current page link
    var array = location.href.split("/");
    currentPageLink = array[array.length - 1];
    
    // check for remove a section part
    var indexOf = currentPageLink.indexOf("#");
    if (indexOf !== -1)
        currentPageLink = currentPageLink.slice(0, indexOf);
}

function updateSidebarHeight() {
    var h = window.innerHeight - navbarHeight;
    sidebarWrapper.css("height", h + "px");
}

function activateSelectedLinkInNavbar() {
    var link = isManual ? manualLink : scriptingLink;
    link.addClass("navbar-link-active");
}

function generateSidebar()
{
    // title
    var title = isManual ? "User Manual " : "Scripting API ";
    title += "(" + VERSION + ")";
    $(".sidebar-title").text(title);

    // generate branches
    var ul = $('<ul id="sidebarUl"></ul>');
    for (var i = 0; i < sidebarItems.length; i++)
        generateBranch(sidebarItems[i], ul);

    var sidebar = $(".sidebar");
    sidebar.append(ul);
    sidebar.append("<div style='height:1em'></div>"); // add a space at the bottom

    $("#loadingIndicator").hide();
    expandCurrentLinkParentsInSidebar();
    expandCurrentLinkInSidebar();
}

function expandCurrentLinkParentsInSidebar() {
    var activeLink = $('.sidebar-link-active');
    if (activeLink)
    {
        var parents = activeLink.parents('ul');
        for (var i = 0; i < parents.length; i++)
        {
            var parent = $(parents[i]);

            // ignore the sidebarUl
            if (parent.attr("id") === "sidebarUl")
                continue;

            var icon = parent.parent("li").children(":first");
            if (icon)
                toggleNodeVisibility(icon, 0);
        }
    }
}

/**
 * If the current link is a parent it is exapnded to show it children
 */
function expandCurrentLinkInSidebar() {
    var activeLink = $('.sidebar-link-active');
    if (activeLink)
    {
        var icon = activeLink.prev();
        if (icon.hasClass("fa-plus-square"))
            toggleNodeVisibility(icon, 0);
    }
}

function updateTitles()
{
    var contentTitle;
    var pageTitle = "CGLocalization ";

    var activeLink = $('.sidebar-link-active');
    if (activeLink)
        contentTitle = activeLink.text();

    pageTitle += isManual ? "Manual" : "Scripting";
    pageTitle += " - " + contentTitle;

    $("#contentTitle").text(contentTitle);
    document.title = pageTitle;
}

/**
 * Generate a 'li' item that is appened to the given 'ul'.
 * If the item has a 'children' array of items, a nested 'ul' for the children is also generated.
 * 
 * @param {Object} item The item to use. It must have a 'name', 'url' and an optional 'children' array of items.
 * @param {UnsortedList} ul The ul to append the generated 'li'.
 */
function generateBranch(item, ul)
{
    var name = item.name;
    var url = item.url;
    var children = item.children;
    var hasChildren = children && children.length > 0;

    // create the root li and append it to the ul
    var li = $("<li>").appendTo(ul);
    sidebarElementsGenerated.push(li);

    // check for add link
    if (url)
    {
        var url = url + ".html";
        let klass = "sidebar-link";
        var a = $("<a>").attr('href', url).text(name).appendTo(li);

        // if is the current link, mark it as the active one
        if (currentPageLink === url)
            klass = "sidebar-link-active";

        a.addClass(klass);
    }
    else
    {
        // create a span with the name and appen it to the li
        var span = $("<span>").text(name).appendTo(li);

        // if has children, allow it to toggle children
        if (hasChildren)
        {
            span.addClass("sidebar-no-link-but-has-children");
            span.click(function () {
                toggleNodeVisibility(icon);
            });
        }
    }

    // icon and generate children
    var icon = $('<span>').addClass("node");
    if (hasChildren)
    {
        // toggle visibility on clicked
        icon.click(function () {
            toggleNodeVisibility(icon);
        });

        icon.addClass("fa-plus-square"); // set the collapsed icon
        li.prepend(icon);                // and place it to the start

        var children_ul = $('<ul>'); // create nested ul for the chidren
        children_ul.hide();          // hide it by default
        li.append(children_ul);      // add it to the li

        // generate a branch also for each child
        for (var i = 0; i < children.length; i++)
            generateBranch(children[i], children_ul);
    }
    else
    {
        icon.addClass("leaf-icon"); // set the leaf icon
        li.prepend(icon);           // and place it to the start 
    }
}

function toggleNodeVisibility(icon, speed = "fast")
{
    // if expanded set the collapsed icon
    if (icon.hasClass("fa-plus-square"))
    {
        icon.removeClass("fa-plus-square");
        icon.addClass("fa-minus-square");
    }
    else
    {
        // is collapsed, set the expanded icon
        icon.removeClass("fa-minus-square");
        icon.addClass("fa-plus-square");
    }

    // find the ul next to the icon and toggle the visibility
    var child_ul = icon.siblings("ul:first");
    child_ul.slideToggle(speed);
}

/**
 * Show the sidebarWrapper and the close panel. The top button is morphed to an X.
 */
function showSidebar() {
    closePanel.show();
    sidebarWrapper.animate({left: "0px"});
    showSidebarButton.addClass("morph-to-x");
}

/**
 * Close the sidebarWrapper and the close panel. The top button is morphed to 3 bars.
 */
function closeSidebar() {
    closePanel.hide();
    sidebarWrapper.animate({left: "-350px"}); // the hideSidebarPosLeft variable do not works here :(
    showSidebarButton.removeClass("morph-to-x");
}

function getCssVariable(varName)
{
    var bodyStyles = window.getComputedStyle(document.body);
    return bodyStyles.getPropertyValue(varName);
}

function setCssVariable(varName, newValue)
{
    var bodyStyles = window.getComputedStyle(document.body);
    bodyStyles.setProperty(varName, newValue);
}

function initSearchContainers()
{
    var searchContainers = $(".search-container");
    for (var i = 0; i < searchContainers.length; i++)
    {
        var searchContainer = $(searchContainers[i]);
        var textField = searchContainer.find(".search-text-field");

        // add focus/blur events
        textField.focus(function () {
            searchContainer.addClass("search-container-focused");
        });
        textField.blur(function () {
            searchContainer.removeClass("search-container-focused");
        });
    }
}

function searchInSidebar() {
    var inputText = txtSidebarSearch.val();
    var filter = inputText.toUpperCase().trim();

    var hidedCounter = 0;
    var n = sidebarElementsGenerated.length;
    for (var i = 0; i < n; i++)
    {
        var element = sidebarElementsGenerated[i];

        // show it if contain the filter
        if (element.text().toUpperCase().indexOf(filter) > -1)
        {
            element.show();
        }
        else // hide it and increment the counter
        {
            element.hide();
            hidedCounter++;
        }
    }

    // check for show/hide the btnClearSidebarSearch
    if (inputText !== "")
        btnClearSidebarSearch.show();
    else
        btnClearSidebarSearch.hide();

    // check for show/hide the labelNoSearchResults
    if (hidedCounter === n)
        labelNoSearchResults.show();
    else
        labelNoSearchResults.hide();
}

function clearSidebarSearch()
{
    txtSidebarSearch.val("");
    searchInSidebar();
}

function loadIncludes()
{
    // https://stackoverflow.com/questions/8988855/include-another-html-file-in-a-html-file
    var includes = $("[data-include]");
    jQuery.each(includes, function () {
        $(this).load($(this).attr("data-include"));
    });
}