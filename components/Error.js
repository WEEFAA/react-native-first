import React from 'react'
import { Container } from './Container'
import { StyleSheet } from 'react-native'
import { Title, HumanBody } from './Typography'
import { EggShell } from './../styles'
import PropTypes from 'prop-types'

const errorPropTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
    darkTheme: PropTypes.bool.isRequired,
    titleProps: PropTypes.object.isRequired,
    descriptionProps: PropTypes.object.isRequired,
    style: PropTypes.object,
}
const errorDefaultProps = {
    title: 'Oops',
    description: 'Something went wrong...',
    bgColor: EggShell,
    darkTheme: false,
    titleProps: {},
    descriptionProps: {},
    style: {},
}

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false,
        }
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        console.warn(errorInfo)
    }

    render() {
        const {
            darkTheme,
            titleProps,
            descriptionProps,
            bgColor,
            style,
            title,
            description,
            ...props
        } = this.props
        if (this.state.hasError) {
            return (
                <Container style={styles.errorContainer(bgColor, style)} {...props}>
                    <Title darkTheme={darkTheme} {...titleProps}>
                        {title}
                    </Title>
                    <HumanBody darkTheme={darkTheme} {...descriptionProps}>
                        {description}
                    </HumanBody>
                </Container>
            )
        }
        return this.props.children
    }
}

const styles = StyleSheet.create({
    errorContainer: (bgColor, style) =>
        StyleSheet.flatten([
            {
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: bgColor,
            },
            style,
        ]),
})

ErrorBoundary.propTypes = errorPropTypes
ErrorBoundary.defaultProps = errorDefaultProps
export default ErrorBoundary
