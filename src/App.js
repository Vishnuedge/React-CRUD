import React from 'react';
import './style.css';
import axios from 'axios';
let postsUrl = 'https://jsonplaceholder.typicode.com/posts';
import ViewModal from './viewModel.js';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      id: '',
      userId: '',
      title: '',
      body: '',
      posts: [],
      comments: [],
      openModalData: '',
      isOpenModel: false
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  // READ data from API :

  getPosts = async () => {
    const { data } = await axios.get(postsUrl);
    this.setState({ posts: data });
  };

  // GETTING COMMENTS API :
  getComments = async POSTID => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${POSTID}/comments`
    );
    this.setState({ comments: data });
    console.log(this.state.comments);
    this.setState({
      openModalData: data,
      isOpenModel: !this.state.isOpenModel
    });
  };

  //DELETE data from TABLE:

  deletePosts = async postId => {
    await axios.delete(`${postsUrl}/${postId}`);
    let posts = [...this.state.posts];
    posts = posts.filter(post => post.id != postId);

    this.setState({ posts });
  };

  //CREATE :

  createPosts = async () => {
    let { data } = await axios.post(postsUrl, {
      userId: this.state.userId,
      title: this.state.title,
      body: this.state.body
    });
    let posts = [...this.state.posts];
    posts.push(data);
    this.setState({ posts });
  };

  // HANDLE CHANGE :

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  //HANDLE SUBMIT :

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.id) {
      this.updatePosts();
    } else {
      this.createPosts();
    }
    console.log(this.state);
  };

  // SELECT POST BEFORE UPDATE

  selectPosts = post => {
    this.setState({
      // userId: post.userId,
      // title: post.title,
      // body: post.body

      ...post
    });
  };

  // UPDATE AND POST TO TABLE

  updatePosts = async () => {
    let { data } = await axios.put(`${postsUrl}/${this.state.id}`, {
      userId: this.state.userId,
      title: this.state.title,
      body: this.state.body
    });
    let posts = [...this.state.posts];
    const postsIndex = posts.findIndex(post => post.id === this.state.id);
    posts[postsIndex] = data;
    this.setState({ posts });
  };

  //TOGGLE

  toggle = () => {
    this.setState({ isOpenModel: !this.state.isOpenModel });
  };

  render() {
    return (
      <div>
        <>
          <div>
            {this.state.isOpenModel ? (
              <ViewModal
                isOpen={true}
                toggle={this.toggle}
                data={this.state.openModalData}
              />
            ) : (
              <div />
            )}
          </div>
          <div>
            <div className="mb-3">
              <label className="form-label">USER ID </label>
              <input
                type="text"
                class="form-control"
                name="userId"
                value={this.state.userId}
                onChange={this.handleChange}
              />
            </div>
          </div>

          {/* TITLE INPUT */}
          <div>
            <div className="mb-3">
              <label className="form-label">TITLE </label>
              <input
                type="text"
                class="form-control"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </div>
          </div>

          {/* BODY INPUT */}
          <div>
            <div className="mb-3">
              <label className="form-label">BODY </label>
              <input
                type="text"
                class="form-control"
                name="body"
                value={this.state.body}
                onChange={this.handleChange}
              />
            </div>
          </div>
          {/* SUBMIT BUTTON */}

          <div>
            <button
              type="submit"
              class="btn btn-primary"
              onClick={this.handleSubmit}
            >
              SUBMIT
            </button>
          </div>
        </>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">USER ID</th>
              <th scope="col">TITLE</th>
              <th scope="col">BODY</th>
            </tr>
          </thead>
          <tbody>
            {/* MAP THROW POSTS ARRAY AND GET EACH DATA */}
            {this.state.posts.map(post => {
              return (
                <>
                  <tr key={post.id}>
                    <th scope="row">{post.id}</th>
                    <td>{post.userId}</td>
                    <td>{post.title}</td>
                    <td>{post.body}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => this.deletePosts(post.id)}
                      >
                        DELETE
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => this.selectPosts(post)}
                      >
                        UPDATE
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => this.getComments(post.id)}
                      >
                        VIEW
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
