import React, { Component } from "react";
import styles from "./ratings.module.css";
import PropTypes from "prop-types";
import StarRating from "./StarRatings";
import { withRouter } from "react-router-dom";
import { Formik, ErrorMessage, Field } from "formik";
import { Form, FormGroup, Button } from "reactstrap";
import StarRatedReviewFormSchema from "../../components/ratings/StarRatedReviewFormSchema";
import { toast } from "react-toastify";
import * as ratingService from "../../services/rating/ratingService";

class StarRatedReviewForm extends Component {
  state = {
    commentData: this.commentData,
  };

  componentDidMount() {
    console.log("component did mount");
  }

  commentData() {
    console.log("comment data coming in");
    if (this.props.match.params.Id) {
      return {
        ratedEntityId: this.props.location.state.payload.id,
        subject: "",
        text: "",
        rating: 0,
        isDeleted: false,
      };
    }
  }

  onRatingSelect = (rating, setFieldValue) => {
    setFieldValue("rating", rating);
    console.log(rating, "Rating Set");
  };

  handleSubmit = (values, { resetForm }) => {
    console.log(values);
    const ratedEntityId = this.props.location.state.payload.id;

    const data = {
      ratedEntityId: ratedEntityId,
      subject: values.subject,
      text: values.text,
      rating: values.rating,
      isDeleted: this.state.commentData.isDeleted,
    };

    console.log("Post Rated Comment Button was triggered..");
    ratingService
      .addRequest(data)
      .then(this.onPostCommentSuccess)
      .catch(this.onPostCommentError);

    resetForm(this.state.commentData);
  };

  onPostCommentSuccess = (response) => {
    console.log(response.data, "Rated Comment was posted...");
    toast.success("Rated Comment was posted...");
    if (this.props.location.state.prevPath === "/menu") {
      this.props.history.push("/menu", this.props.location.state.vendorId);
    } else {
      this.props.history.push(`${this.props.location.state.prevPath}`);
    }
  };

  onPostCommentError = (response) => {
    console.log(response, "Error: Submit Failed!");
    toast.error("Error: Submit Failed...");
  };

  render() {
    return (
      <React.Fragment>
        <Formik
          enableReinitialize={true}
          validationSchema={StarRatedReviewFormSchema}
          initialValues={this.state.commentData}
          onSubmit={this.handleSubmit}
        >
          {(props) => {
            const {
              values,
              handleSubmit,
              isValid,
              isSubmitting,
              setFieldValue,
            } = props;

            return (
              <div className={styles.CommentForm}>
                <div
                  className="d-flex justify-content-center col-lg-12 text-center p-1"
                  style={{ backgroundColor: "white" }}
                >
                  <div className="col-xl-6 my-2">
                    <Form className="form-horizontal" onSubmit={handleSubmit}>
                      <FormGroup>
                        <StarRating
                          className={styles}
                          checked={values.rating}
                          ratingValue={(rating) =>
                            this.onRatingSelect(rating, setFieldValue)
                          }
                          value="rating"
                        />
                        <Field
                          className="form-control my-1"
                          id="subject"
                          name="subject"
                          rows="5"
                          values={values.subject}
                          placeholder="Enter Subject"
                        ></Field>
                        <Field
                          as="textarea"
                          className="form-control"
                          id="text"
                          name="text"
                          rows="5"
                          values={values.text}
                          placeholder="Enter Comment Below...  "
                        ></Field>
                        <ErrorMessage
                          component="span"
                          name="text"
                          className={styles.errorMessage}
                        />
                      </FormGroup>
                      <div className="form-group text-center">
                        <Button
                          className={`${styles.postCommentBtn} btn btn-sm btn-secondary`}
                          type="submit"
                          disabled={!isValid || isSubmitting}
                        >
                          <b>Post</b>
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            );
          }}
        </Formik>
      </React.Fragment>
    );
  }
}

StarRatedReviewForm .propTypes = {
  values: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      Id: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
    state: PropTypes.shape({
      payload: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string.isRequired,
      }),
    }),
  }),
};

export default withRouter(StarRatedReviewForm);
