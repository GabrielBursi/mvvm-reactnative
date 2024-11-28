import React, { PropsWithChildren } from 'react'
import { StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export const AppProvider = ({ children }: PropsWithChildren) => {
	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			<NavigationContainer>
				<SafeAreaProvider>
					<StatusBar
						barStyle="dark-content"
						backgroundColor="transparent"
						translucent
					/>
					{children}
				</SafeAreaProvider>
			</NavigationContainer>
		</QueryClientProvider>
	)
}
