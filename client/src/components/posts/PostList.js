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

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostComment from "./PostComment";
import { useStream } from "../../context/StreamContext";
import { usePost } from "../../context/PostContext";

const PostList = () => {
  const { streams } = useStream();
  const { posts } = usePost();

  if (posts) {
    console.log(posts);
  }

  // console.log(streams);

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
      <section className="section p-4 pt-2">
        <PostHeader />
        <PostBody posts={posts} />
        <PostComment />
      </section>
    </>
  );
};

export default PostList;
