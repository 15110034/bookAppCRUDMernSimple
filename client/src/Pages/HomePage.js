import React, { Component } from "react";
import { Table, Button2 } from "@key46/theme";
import Axios from "axios";
// import PropTypes from "prop-types";

class HomePage extends Component {
  state = {
    items: [],
    loading: false,
    error: ""
  };
  componentDidMount = async () => {
    try {
      const { loading } = this.state;
      const { history } = this.props;

      if (!loading) {
        this.setState({ loading: true });
      }
      const res = await Axios.get("/api/books");
      const datasave = res.data.map(book => {
        const databook = {
          columnItem1: book.isbn || book._id,
          columnItem1OnClick: () => {
            history.push(`/book/${book._id}`);
          },
          columnItem2: book.title,
          columnItem3: book.author
        };
        return databook;
      });
      this.setState({ items: datasave, loading: false });
    } catch (e) {
      alert(e.response);
    }
  };
  onClickAddNew = () => {
    const { history } = this.props;

    history.push(`/newbook`);
  };

  render() {
    const { items, error } = this.state;

    return (
      <div>
        {error}
        {/* <Button2 onClick={this.onClickAddNew}>Add new</Button2> */}
        <Table items={items} />
      </div>
    );
  }
}

export default HomePage;
