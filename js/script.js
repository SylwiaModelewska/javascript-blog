'use strict';

function titleClickHandler(event){
  event.preventDefault();

  const clickedElement = this;
  //console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  //console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const hrefOfClickedLink = clickedElement.getAttribute('href');
  //console.log('Href of the clicked link: ', hrefOfClickedLink);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(hrefOfClickedLink);
  //console.log('Article found: ', targetArticle);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');
}


// CREATING THE LIST OF LINKS

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = ''){

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  //console.log("Lista tytułów: ", titleList);

  titleList.innerHTML = '';

  /* [DONE] for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  //console.log('Selector bez custom: ', optArticleSelector);
  //console.log('Custom: ', customSelector);
  //console.log('Selector z custom: ', optArticleSelector + customSelector);

  let html = '';

  for(let article of articles){

    /* get the article id */

    const articleId = article.getAttribute('id');
    //console.log('Id artykułu: ', articleId);

    /* find the title element & get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    //console.log('Tytuł artykułu: ', articleTitle);

    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log("HTML: ", linkHTML);

    /* insert link into titleList */

    html = html + linkHTML;
    //console.log("Zawartość zmiennej html: ", html);
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

// CREATING THE LIST OF TAGS

function generateTags(){

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  //console.log('Lista artykułów do tagów: ', articles);

  /* START LOOP: for every article: */
  for(let article of articles){

    /* find tags wrapper */
    const tagList = article.querySelector(optArticleTagsSelector);
    //console.log('Wrapper tagów html: ', tagList);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    //console.log('Lista tagów atrybut: ', articleTags);

    /* split tags into array */
    const articleTagsArray  = articleTags.split(' ');
    //console.log('Lista tagów rozbita: ', articleTagsArray );

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray ){

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag  + '">' + tag + '</a></li>\n';
      //console.log('Link html: ', linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;
      //console.log('HTML łącznie: ', html);

    }
    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    tagList.innerHTML = html;
    //console.log('Zawartość TagList: ', tagList);
  }
  /* END LOOP: for every article: */
}

generateTags();

//HANDLING TAG CLICK

function tagClickHandler(event){

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  //console.log('Href linka: ', href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  //console.log('Wyciągnięty tag z href: ', tag);

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]'); // ^= starts with

  /* START LOOP: for each active tag link */
  for(let activeTagLink of activeTagLinks){
    /* remove class active */
    activeTagLink.classList.remove('active');
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for(let tagLink of tagLinks){
    /* add class active */
    tagLink.classList.add('active');
  }
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]'); // ~= contains
}

function addClickListenersToTags(){

  /* find all links to tags */
  const links = document.querySelectorAll('.post-tags .list a');

  /* START LOOP: for each link */
  for(let link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */

}

addClickListenersToTags();

function generateAuthors(){

  /* finding all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){

    /* finding author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    //console.log('Wrapper: ', authorWrapper);

    /* getting author from data-author attribute */
    const authorAtrr = article.getAttribute('data-author');
    //console.log('Autor - Atrybut: ', authorAtrr);

    /* creating inner html with by*/
    const innerText = 'by <a href="#author-' + authorAtrr  + '">' + authorAtrr + '</a>';
    //console.log('Przekazywane do wrappera: ', innerText);

    /* inserting content into wrapper */
    authorWrapper.innerHTML = innerText;
  }
}

generateAuthors();

//HANDLING AUTHORS CLICK

function authorClickHandler(event){
  
  /* preventing default action for this event */
  event.preventDefault();

  const clickedElement = this;
  
  /* finding "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('Href linka: ', href);

  /* extracting author from the "href" constant */
  const author = href.replace('#author-', '');
  console.log('Wyciągnięty autor z href: ', author);

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors(){
  /* find all author links */
  const links = document.querySelectorAll('.post-author a');

  for(let link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();