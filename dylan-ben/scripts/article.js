'use strict';

let articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// It is capitalized because it is a contructor. This is used within the function because it is referring to the global object.

function Article (rawDataObj) {
  // TODO: Use the JS object that is passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`
  this.title=rawDataObj.title;
  this.category=rawDataObj.category;
  this.author=rawDataObj.author;
  this.authorUrl=rawDataObj.authorUrl;
  this.publishedOn=rawDataObj.publishedOn;
  this.bodyCopy=rawDataObj.body;
}

Article.prototype.toHtml = function() {
  // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
  // .clone() makes a copy of not only the matched elements but also all the descendant elements. It is an easy way to duplicate the article elements on the page. 


  let $newArticle = $('article.template').clone(); //since defined, do not need parens later on.
  /* TODO: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */
  //done
  $newArticle.removeClass('template');
  console.log($newArticle.length);

  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.attr('data-category', this.category);

  /* TODO: Now use jQuery traversal and setter methods to fill in the rest 
  of the current template clone with values of the properties of this 
  particular Article instance.
    We need to fill in:
      1. author name, done
      2. author url, done
      3. article title, done
      4. article body,  done
      5. publication date. done */

  $newArticle.find('h1').text(this.title); //find the h1 in 'this' instance of article. not all on page.
  $newArticle.find('a').text(this.author).attr('href', this.authorUrl);
  $newArticle.find('.article-body').html(this.bodyCopy);
  $newArticle.find('div:contains("published")').append(this.publishedOn);

  // REVIEW: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// TODO: Refactor these for loops using the .forEach() array method.

for(let i = 0; i < rawData.length; i++) {
  articles.push(new Article(rawData[i]));
}
console.log(articles);

for(let i = 0; i < articles.length; i++) {
  $('#articles').append(articles[i].toHtml());
}