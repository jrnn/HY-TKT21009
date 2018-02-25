import React from "react"
import Button from "./button"

const FeedbackControls = ({ store }) => (
  <table>
    <tbody>
      <tr>
        <td>
          <Button
            label="Good :)"
            onClick={e => store.dispatch({ type : "GOOD" })}
          />
        </td>
        <td>
          <Button
            label="Okay :|"
            onClick={e => store.dispatch({ type : "OKAY" })}
          />
        </td>
        <td>
          <Button
            label="Bad :("
            onClick={e => store.dispatch({ type : "BAD" })}
          />
        </td>
      </tr>
    </tbody>
  </table>
)

export default FeedbackControls
