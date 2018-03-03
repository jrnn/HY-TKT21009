import React from "react"
import { Grid, Image } from "semantic-ui-react"

const About = () => (
  <Grid>
    <Grid.Row>
      <Grid.Column>
        <h2>About anecdote app</h2>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column width={10}>
        <p>According to Wikipedia:</p>
        <p><em>
          An anecdote is a brief, revealing account of an individual person or
          an incident. Occasionally humorous, anecdotes differ from jokes
          because their primary purpose is not simply to provoke laughter but to
          reveal a truth more general than the brief tale itself, such as to
          characterize a person by delineating a specific quirk or trait, to
          communicate an abstract idea about a person, place, or thing through
          the concrete details of a short narrative. An anecdote is "a story
          with a point."
        </em></p>
        <p>
          Software engineering is full of excellent anecdotes, at this app you
          can find the best and add your own.
        </p>
      </Grid.Column>
      <Grid.Column width={6}>
        <Image src="http://i0.kym-cdn.com/photos/images/newsfeed/000/283/509/e48.jpg" />
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

export default About
