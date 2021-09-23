// import React from "react";
// import Modal from "../Modal";
// import history from "../../history";
// import { fetchStream, deleteStream } from "../../actions";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";

// class StreamDelete extends React.Component {
//   componentDidMount() {
//     this.props.fetchStream(this.props.match.params.id);
//   }

//   deleteStream;

//   renderActions() {
//     const { id } = this.props.match.params;
//     return (
//       <div>
//         <button
//           onClick={() => this.props.deleteStream(id)}
//           className="ui negative button"
//         >
//           Delete
//         </button>
//         <Link to="/" className="ui button">
//           Cancel
//         </Link>
//       </div>
//     );
//   }

//   renderContent() {
//     if (!this.props.stream) {
//       return "Are you sure you want to delete this stream";
//     }

//     return `Are you sure you want to delete the stream with the title: ${this.props.stream.title}`;
//   }

//   render() {
//     console.log(this.props);
//     return (
//       <div>
//         delete stream
//         <Modal
//           title="Delete Stream"
//           content={this.renderContent()}
//           actions={this.renderActions()}
//           onDismiss={() => history.push("/")}
//         />
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state, ownProps) => {
//   return { stream: state.streams[ownProps.match.params.id] };
// };

// export default connect(mapStateToProps, { fetchStream, deleteStream })(
//   StreamDelete
// );
