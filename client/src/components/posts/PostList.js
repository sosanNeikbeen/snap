// import React from "react";
// import { connect } from "react-redux";
// import { fetchStreams } from "../../actions/index";
// import { Link } from "react-router-dom";

// class StreamList extends React.Component {
//   componentDidMount() {
//     this.props.fetchStreams();
//   }
//   renderAdmin(stream) {
//     if (stream.userId === this.props.currentUserId) {
//       return (
//         <div className="right floated content">
//           <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
//             Edit
//           </Link>
//           <Link
//             to={`/streams/delete/${stream.id}`}
//             className="ui button negative"
//           >
//             Delete
//           </Link>
//         </div>
//       );
//     }
//   }

//   renderList() {
//     return this.props.streams.map((stream) => {
//       return (
//         <div className="item" key={stream.id}>
//           {this.renderAdmin(stream)}
//           <i className="large middle aligned icon camera" />
//           <div className="content">
//             <Link to={`/streams/${stream.id}`} className="header">
//               {stream.title}
//             </Link>
//             <div className="description">{stream.description}</div>
//           </div>
//         </div>
//       );
//     });
//   }

//   renderCreate() {
//     if (this.props.isSignedIn) {
//       return (
//         <div style={{ textAlign: "right" }}>
//           <Link to="/streams/new" className="ui button primary">
//             Create Stream
//           </Link>
//         </div>
//       );
//     }
//   }

//   render() {
//     return (
//       <div>
//         <h2>Streams</h2>
//         <div className="ui celled list">{this.renderList()}</div>
//         {this.renderCreate()}
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     streams: Object.values(state.streams),
//     currentUserId: state.auth.userId,
//     isSignedIn: state.auth.isSignedIn,
//   };
// };

// export default connect(mapStateToProps, { fetchStreams })(StreamList);

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown";
import PostComment from "../comments/CommentList";
import ReactTimeAgo from "react-time-ago";
import { usePost } from "../../context/PostContext";

const PostList = () => {
  const { posts } = usePost();

  console.log(posts);

  return (
    // <div className="ui middle aligned animated list">
    //   {streams &&
    //     streams.map((stream) => (
    //       <div className="item" key={stream._id}>
    //         <div className="content">
    //           <div className="header">
    //             <Link to={`/streams/${stream._id}`} className="header">
    //               {stream.title} {stream.description}
    //             </Link>
    //           </div>
    //           <div className="right floated content">
    //             <Link
    //               to={`/streams/edit/${stream._id}`}
    //               className="ui button primary"
    //             >
    //               Edit
    //             </Link>
    //             <Link
    //               to={`/streams/delete/${stream._id}`}
    //               className="ui button negative"
    //             >
    //               Delete
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    // </div>
    <>
      <section className="section p-4 pt-0">
        {posts &&
          posts.map((post) => (
            <div key={post._id}>
              <article className="media is-mobile pt-5">
                <figure className="media-left">
                  <figure className="image ">
                    <img
                      className="brand-rounded"
                      src="https://bulma.io/images/placeholders/32x32.png"
                    />
                  </figure>
                </figure>
                <div className="media-content is-mobile">
                  <div className="content">
                    <p>
                      <strong>John Smith</strong>{" "}
                      <ReactTimeAgo date={post.created_at} timeStyle="round" />
                      <br />
                    </p>
                  </div>
                </div>

                <div className="media-right">
                  <Dropdown>
                    <div class="dropdown-menu " id="dropdown-menu3" role="menu">
                      <div class="dropdown-content">
                        <Link class="dropdown-item" to={"/profile"}>
                          View Profile
                        </Link>
                        <Link
                          class="dropdown-item"
                          to={`posts/edit/${post._id}`}
                        >
                          Edit Post
                        </Link>
                        <Link
                          class="dropdown-item"
                          to={`posts/delete/${post._id}`}
                        >
                          Delete Post
                        </Link>
                      </div>
                    </div>
                  </Dropdown>
                </div>
              </article>
              <div className="container">
                <figure className="image ">
                  <img src={post.image} />
                </figure>

                <p className="pt-3">
                  {" "}
                  <strong>John Smith</strong> {post.post}
                </p>
                <Link to={`/posts/${post._id}`}>
                  <p className="has-text-grey pt-2"> View all 3 comments</p>
                </Link>
              </div>
            </div>
          ))}
      </section>
    </>
  );
};

export default PostList;
