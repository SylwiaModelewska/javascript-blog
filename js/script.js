'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTag: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
  articleAuthor: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-cloud-tag').innerHTML),
  authorListLink: Handlebars.compile(document.querySelector('#template-list-author').innerHTML)
}

// OPTS

const opts = {
  optArticleSelector: '.post',
  optTitleSelector: '.post-title',
  optTitleListSelector: '.titles',
  optArticleTagsSelector: '.post-tags .list',
  optArticleAuthorSelector: '.post-author',
  optTagsListSelector: '.tags.list',
  optCloudClassCount: 5,
  optCloudClassPrefix: 'tag-size-',
  optAuthorsListSelector: '.list.authors'
};

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

function generateTitleLinks(customSelector = ''){

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(opts.optTitleListSelector);
  //console.log("Lista tytu????w: ", titleList);

  titleList.innerHTML = '';

  /* [DONE] for each article */

  const articles = document.querySelectorAll(opts.optArticleSelector + customSelector);
  //console.log('Selector bez custom: ', optArticleSelector);
  //console.log('Custom: ', customSelector);
  //console.log('Selector z custom: ', optArticleSelector + customSelector);

  let html = '';

  for(let article of articles){

    /* get the article id */

    const articleId = article.getAttribute('id');
    //console.log('Id artyku??u: ', articleId);

    /* find the title element & get the title from the title element */

    const articleTitle = article.querySelector(opts.optTitleSelector).innerHTML;
    //console.log('Tytu?? artyku??u: ', articleTitle);

    /* create HTML of the link */

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    //console.log("HTML: ", linkHTML);

    /* insert link into titleList */

    html = html + linkHTML;
    //console.log("Zawarto???? zmiennej html: ", html);
  }

  titleList.innerHTML = html;
  //console.log('Lista tytu????w: ', html);

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

// CREATING THE LIST OF TAGS

function calculateTagsParams(tags){
  const params = {
    max: 0,
    min: 999999
  };

  for (let tag in tags){
    //console.log(tag + ' is used ' + tags[tag] + ' times');

    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }

  return params;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;

  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (opts.optCloudClassCount - 1) + 1 );

  return classNumber;
}

function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(opts.optArticleSelector);
  //console.log('Lista artyku????w do tag??w: ', articles);

  /* START LOOP: for every article: */
  for(let article of articles){

    /* find tags wrapper */
    const tagListArticle = article.querySelector(opts.optArticleTagsSelector);
    //console.log('Wrapper tag??w html: ', tagList);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    //console.log('Lista tag??w atrybut: ', articleTags);

    /* split tags into array */
    const articleTagsArray  = articleTags.split(' ');
    //console.log('Lista tag??w rozbita: ', articleTagsArray );

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray ){

      /* generate HTML of the link */
      const linkHTMLData = {tagName: tag};
      const linkHTML = templates.articleTag(linkHTMLData);
      //console.log('Link html: ', linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;
      //console.log('HTML ????cznie: ', html);

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]){
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    tagListArticle.innerHTML = html;
  }
  /* END LOOP: for every article: */
  //console.log('Zawarto???? obiektu allTags: ', allTags);

  /* [NEW] find list of tags in right column */
  const tagListCloud = document.querySelector(opts.optTagsListSelector);

  const tagsParams = calculateTagsParams(allTags);
  //console.log('tagParams: ', tagsParams);

  /* [NEW] create variable for all links HTML code */
  //let allTagsHTML = '';
  const allTagsData = {tags: []};

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    //const tagLinkHTML = '<li class="' + opts.optCloudClassPrefix + calculateTagClass(allTags[tag], tagsParams) + '"><a href="#tag-' + tag + '">' + tag + '</a></li>';
    //console.log('tagLinkHTML: ', tagLinkHTML);
    //allTagsHTML += tagLinkHTML;
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /* [NEW] add html from allTagsHTML to tagList */
  //tagListCloud.innerHTML = allTagsHTML;
  tagListCloud.innerHTML = templates.tagCloudLink(allTagsData);
  console.log('allTagsData: ', allTagsData);
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
  //console.log('Wyci??gni??ty tag z href: ', tag);

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
  const links = document.querySelectorAll('.post-tags .list a, .list.tags a');

  /* START LOOP: for each link */
  for(let link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */

}

addClickListenersToTags();

function generateAuthors(){

  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};

  /* finding all articles */
  const articles = document.querySelectorAll(opts.optArticleSelector);

  for(let article of articles){

    /* finding author wrapper */
    const authorWrapper = article.querySelector(opts.optArticleAuthorSelector);
    //console.log('Wrapper: ', authorWrapper);

    /* getting author from data-author attribute */
    const authorAtrr = article.getAttribute('data-author');
    //console.log('Autor - Atrybut: ', authorAtrr);

    /* creating inner html with by*/
    const innerTextData = {author: authorAtrr};
    const innerText = templates.articleAuthor(innerTextData);
    //console.log('Przekazywane do wrappera: ', innerText);

    /* inserting content into wrapper */
    authorWrapper.innerHTML = innerText;

    /* [NEW] check if this link is NOT already in allTags */
    if(!allAuthors[authorAtrr]){
      /* [NEW] add tag to allTags object */
      allAuthors[authorAtrr] = 1;
    } else {
      allAuthors[authorAtrr]++;
    }
  }

  //console.log('Zawarto???? obiektu allAuthors: ', allAuthors);

  /* [NEW] find list of authors in right column */
  const authorList = document.querySelector(opts.optAuthorsListSelector);
  //console.log('Wrap listy autor??w: ', authorList);

  /* [NEW] create variable for all links HTML code */
  //let allAuthorsHTML = '';
  const allAuthorsData = {authors: []};

  /* [NEW] START LOOP: for each author in allAuthors: */
  for(let author in allAuthors){
  /* [NEW] generate code of a link and add it to allAuthorsHTML */
    //const authorLinkHTML = '<li><a href="#author-' + author + '">' + author + '</a> (' + allAuthors[author] + ')</li>';
    //console.log('authorLinkHTML: ', authorLinkHTML);
    //allAuthorsHTML += authorLinkHTML;
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author]
    });
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /* [NEW] add html from allTagsHTML to tagList */
  //authorList.innerHTML = allAuthorsHTML;
  authorList.innerHTML = templates.authorListLink(allAuthorsData);
  console.log('allAuthorsData: ', allAuthorsData);
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
  console.log('Wyci??gni??ty autor z href: ', author);

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors(){
  /* find all author links */
  const links = document.querySelectorAll('.post-author a, .list.authors a');

  for(let link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();
