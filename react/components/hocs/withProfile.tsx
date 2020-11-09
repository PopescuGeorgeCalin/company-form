/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from 'react'
import { Spinner, EmptyState } from 'vtex.styleguide'

export { React }

const withProfile = (WrappedComponent: any): any => {
  class DataFetcherProfileWrapper extends Component {
    public state = {
      profile: {
        IsUserDefined: false,
      },
    }

    public componentDidMount() {
      fetch('/no-cache/profileSystem/getProfile')
        .then(response => response.json())
        .then(async response => {
          if (response.IsUserDefined) {
            this.setState({ ...this.state, profile: response })
          }
        })
    }

    public render() {
      const { profile } = this.state

      return profile.IsUserDefined ? (
        <WrappedComponent {...this.props} profile={profile} />
      ) : (
        <EmptyState>
          <Spinner />
        </EmptyState>
      )
    }
  }

  return DataFetcherProfileWrapper
}

export default withProfile
