import React from "react"
import LastFm from "../components/last-fm"

import "./global.scss"

export default () => (
  <div>
    <h1>My fun music site</h1>
    <p>
      This is going to be a playground for me to play around with different ways
      of organising music information:
    </p>
    <ul>
      <li>my bootlegs</li>
      <li>information from my Last.fm profile</li>
    </ul>
    <p>Narcissistic but fun!</p>
    <LastFm />
  </div>
)
