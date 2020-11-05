import React, { Component } from 'react';
import { Spinner } from 'vtex.styleguide';
import { EmptyState } from 'vtex.styleguide'

export { React }

const withProfile = (WrappedComponent: any): any => {
	class DataFetcherProfileWrapper extends Component {
		state = {
			profile: {
				IsUserDefined: false
			}
		}

		componentDidMount() {
			fetch('/no-cache/profileSystem/getProfile')
			.then((response) => response.json())
			.then(async (response) => {
				if (response.IsUserDefined) {
					this.setState({...this.state, profile: response})
				}
			})
		}

		render() {
			const { profile } = this.state; 
			return profile.IsUserDefined ? (
				<WrappedComponent
					{...this.props}
					profile={profile}
				/>
			) : (
				<EmptyState>
					<Spinner/>
				</EmptyState>
			)
		}
	}

	return DataFetcherProfileWrapper;
}

export default withProfile;