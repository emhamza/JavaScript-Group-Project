import { fetchCategories, fetchLikesForCategory } from './api.js';
import { renderCategory } from './category.js';

const { getComments, showComments, addComment } = require('./comments.js');

const appUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';
const categoriesContainer = document.querySelector('#categories');
const commentsContainer = document.querySelector('#comments');

export async function getAppId() {
  const response = await fetch(appUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    localStorage.setItem('appId', JSON.stringify(await response.text()));
  }
}

export const fetchData = async () => {
  try {
    await getAppId(); // Call getAppId function to get the app id before rendering the categories

    const categories = await fetchCategories();

    const categoriesWithLikes = await Promise.all(
      categories.map(async (category) => {
        const likes = await fetchLikesForCategory(category.idCategory);
        return { ...category, likes };
      }),
    );

    categoriesWithLikes.forEach((category) => {
      const categoryDiv = renderCategory(category);
      categoriesContainer.appendChild(categoryDiv);

      // fetch comments
      getComments(category.idCategory);

      // add comments popup box
      const div1 = document.createElement('div');
      div1.classList = 'modal fade';
      div1.id = `staticBackdrop${category.idCategory}`;
      div1.setAttribute('data-bs-backdrop', 'static');
      div1.setAttribute('tabindex', '-1');
      div1.setAttribute('aria-labelledby', 'exampleModalLabel');
      div1.setAttribute('aria-hidden', 'true');

      const div2 = document.createElement('div');
      div2.classList = 'modal-dialog modal-dialog-scrollable modal-xl';

      const div3 = document.createElement('div');
      div3.classList = 'modal-content';

      const div4 = document.createElement('div');
      div4.classList = 'modal-body p-3 pt-5 d-flex flex-column align-items-center justify-content-center';
      div4.style = 'overflow-y:scroll;';

      const button = document.createElement('button');
      button.type = 'button';
      button.classList = 'btn-close';
      button.style = 'position: absolute; top:20px; right:20px;';
      button.setAttribute('data-bs-dismiss', 'modal');
      button.setAttribute('aria-lable', 'Close');

      const div5 = document.createElement('div');
      div5.classList = 'd-flex align-items-start justify-content-between';

      const image = document.createElement('img');
      image.src = `${category.strCategoryThumb}`;
      image.alt = `${category.strCategory}`;
      image.setAttribute('width', '300');
      image.classList = 'mb-1 pt-5';

      const heading = document.createElement('h3');
      heading.innerHTML = category.strCategory;

      const para = document.createElement('p');
      para.style = 'text-align:justify';
      para.classList = 'px-3';
      para.innerText = category.strCategoryDescription.substring(0, 206);

      const heading2 = document.createElement('h4');
      heading2.innerHTML = 'Comments';
      heading2.id = `commentsHeading${category.idCategory}`;

      const div6 = document.createElement('div');
      div6.id = `commentList${category.idCategory}`;
      div6.classList = 'mb-3';

      const heading3 = document.createElement('h4');
      heading3.innerHTML = 'Add a comment';

      const form = document.createElement('form');
      form.id = `commentForm${category.idCategory}`;

      const input1 = document.createElement('input');
      input1.type = 'hidden';
      input1.name = 'id';
      input1.value = category.idCategory;

      const input2 = document.createElement('input');
      input2.type = 'text';
      input2.placeholder = 'Your Name';
      input2.classList = 'form-control mb-3';
      input2.name = 'username';

      const textarea = document.createElement('textarea');
      textarea.name = 'comment';
      textarea.rows = '5';
      textarea.cols = '5';
      textarea.placeholder = 'Your Insights';
      textarea.classList = 'form-control mb-3';
      textarea.style = 'resize:none';

      const button2 = document.createElement('button');
      button2.classList = 'btn btn-outline-info mb-3 float-end';
      button2.innerHTML = 'Comment';

      div1.appendChild(div2);
      div2.appendChild(div3);
      div3.appendChild(div4);
      div4.appendChild(button);
      div4.appendChild(div5);
      div5.appendChild(image);
      div4.appendChild(heading);
      div4.appendChild(para);
      div4.appendChild(heading2);
      div4.appendChild(div6);
      div4.appendChild(heading3);
      div4.appendChild(form);
      form.appendChild(input1);
      form.appendChild(input2);
      form.appendChild(textarea);
      form.appendChild(button2);
      commentsContainer.appendChild(div1);

      showComments(category.idCategory);
      const commentForm = document.getElementById(`commentForm${category.idCategory}`);
      commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
          id: commentForm.id.value,
          username: commentForm.username.value,
          comment: commentForm.comment.value,
        };
        addComment(data);
        commentForm.reset();
      });
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};
