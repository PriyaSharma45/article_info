import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { ADD_ARTICLE } from '../../graphql/mutation';
import { useMutation } from '@apollo/client'
import { useAuth0 } from '../AuthWrapper';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Author = ({ name, dob, articles, authorId }) => {
  const classes = useStyles();

  const {
    isAuthenticated
  } = useAuth0();

  const [title, setTitle] = React.useState('')
  const [publishedDate, setPublishedDate] = React.useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handlePublishedDateChange = (event) => {
    setPublishedDate(event.target.value)
  }

  const renderArticles = () => {
    if (articles.length === 0) {
      return <li>no articles available</li>
    }

    return articles.map(article => <li><span>{article.title} {article.published_date}</span></li>)
  }

  const [saveArticle] = useMutation(ADD_ARTICLE, {});

  const clearInputs = () => {
    setTitle('')
    setPublishedDate('')
  }

  const handleSaveArticle = () => {
    saveArticle({
      variables: {
        author_id: authorId,
        published_date: publishedDate,
        title: title,
      },
    })
    clearInputs();
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {dob}
        </Typography>
        <ul>
          {renderArticles()}
        </ul>
      </CardContent>
      <CardActions>
        {isAuthenticated && <div className={classes.root}>
          <TextField id="outlined-basic" label="Title" variant="outlined" value={title} onChange={handleTitleChange} />
          <TextField id="outlined-basic" label="Published Date" variant="outlined" value={publishedDate} onChange={handlePublishedDateChange} />
          <Button size="small" primary onClick={handleSaveArticle}>Add Article</Button>
        </div>}
      </CardActions>
    </Card>
  );
}

const AuthorList = ({ authors }) => {

  const renderAuthorList = () =>
    authors.map(author => <Author name={author ? author.name : 'No name specified'} dob={author.dob} articles={author.articles} authorId={author.id} />);

  if (authors.length === 0) {
    return <div>Author are not listed</div>
  }

  return (
    <div>
      <div>
        <h3>Author List</h3>
      </div>
      {renderAuthorList()}
    </div>
  )
}

export default AuthorList;
