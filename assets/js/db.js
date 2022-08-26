import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-analytics.js";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  query,
  orderBy,
  limit,
  doc,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOFZxWUm7q9DRsBH8hn7McRPIM0IbJonA",
  authDomain: "akshai-ui.firebaseapp.com",
  projectId: "akshai-ui",
  storageBucket: "akshai-ui.appspot.com",
  messagingSenderId: "355938465039",
  appId: "1:355938465039:web:7e87c2ed7d8ddcfa34fa7a",
  measurementId: "G-PE3VZV4GDH",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// $(document).ready(function () {
//   fetchLatestBlog();
// });
window.fetchLatestBlog = async function (pageName, idTag, postLimit) {
  // Home Post display
  const first = query(
    collection(db, "posts"),
    orderBy("timestamp"),
    limit(postLimit)
  );
  const querySnapshot = await getDocs(first);
  querySnapshot.forEach((doc) => {
    ngForFunctionality(doc.data(), pageName, idTag, doc.id);
    //console.log(doc.data());
  });
};
window.fetchPost = async function () {
  let params = new URL(document.location).searchParams;
  let id = params.get("post");
  console.log("post id of current page :" + id);

  const first = query(doc(db, "posts/" + id));
  const querySnapshot = await getDoc(first);
  console.log(querySnapshot.data());
  createPost(querySnapshot.data());
};
function ngForFunctionality(post, type, id, postID) {
  let value = "";
  let postURL = "";
  postURL += "post.html?post=" + postID;
  if (type === "home") {
    console.log(postURL);
    value += `
    <div class="swiper-slide blog-classic-item">
                      <div
                        class="blog-item p-relative d-flex align-items-center h-100 w-100"
                        data-swiper-parallax-scale="0.85"
                      >
                        <div class="box-meta">
                          <div class="entry-date">
                            <span class="author">${post.author}</span>
                            <a href="#">${post.createdDate}</a>
                          </div>
                        </div>

                        <div class="box-img over-hidden">
                          <img
                            class="cover-bg-img"
                            src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                            data-dsn-src="${post.cover}"
                            alt=""
                          />
                        </div>
                        <div class="box-content p-relative">
                          <div class="box-content-body">
                            <div class="metas">
                              <span>${post.category}</span>
                            </div>
                            <h4 class="title-block mb-20">
                              <a href="${postURL}"
                                >${post.title}</a
                              >
                            </h4>
                            <p>
                             ${post.summary}
                            </p>

                            <a href="${postURL}" class="link-vist p-relative mt-20">
                              <span class="link-vist-text">Load More</span>

                              <div class="link-vist-arrow">
                                <svg viewBox="0 0 80 80">
                                  <polyline
                                    points="19.89 15.25 64.03 15.25 64.03 59.33"
                                  ></polyline>
                                  <line
                                    x1="64.03"
                                    y1="15.25"
                                    x2="14.03"
                                    y2="65.18"
                                  ></line>
                                </svg>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
    `;
  } else if (type === "blog") {
    value += `<div class=" blog-item p-relative d-flex align-items-center h-100 w-100"
                                    data-swiper-parallax-scale="0.85">
                                    <div class="box-meta">
                                        <div class="entry-date">
                                            <span class="author">${post.author}</span>
                                            <a href="${postURL}" class="effect-ajax">${post.createdDate}</a>
                                        </div>
                                    </div>

                                    <div class="box-img over-hidden">
                                        <img class="cover-bg-img"
                                            src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                                            data-dsn-src="${post.cover}" alt="">
                                    </div>
                                    <div class="box-content p-relative">

                                        <div class="box-content-body">
                                            <div class="metas">
                                                <span>${post.category}</span>
                                             
                                            </div>
                                            <h4 class="title-block mb-20">
                                                <a href="${postURL}" class="effect-ajax">${post.title}</a>
                                            </h4>
                                            <p>${post.summary}</p>
                                            <a href="${postURL}" class="effect-ajax link-vist p-relative mt-20">

                                                <span class="link-vist-text">Load More</span>

                                                <div class="link-vist-arrow">
                                                    <svg viewBox="0 0 80 80">
                                                        <polyline points="19.89 15.25 64.03 15.25 64.03 59.33">
                                                        </polyline>
                                                        <line x1="64.03" y1="15.25" x2="14.03" y2="65.18">
                                                        </line>
                                                    </svg>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>`;
  }

  $(id).prepend(value);
}

async function createPost(data) {
  $("#date").text(data.createdDate);
  $("#category").text(data.category);
  $("#postTitle").text(data.title);
  $("#cover").attr({ "data-dsn-src": data.cover, src: data.cover });
}
