import React from 'react'
import Page from '../components/Page'

export default function EditPage ({ user, world }) {
  return (
    <Page user={user}>
      editor for {world.name}
    </Page>
  )
}
