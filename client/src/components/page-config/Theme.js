import React, { Component } from 'react'
import { SketchPicker } from 'react-color'

import Title from '../page-viewer/header/Title'
import Fab from '../page-viewer/overlay/Fab'
import './Theme.scss'

class Theme extends Component {
    constructor (props) {
        super(props)

        this.state = {
            selectedTheme: {}
        }
        this.selectTheme = this.selectTheme.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }
    componentWillMount () {
        document.addEventListener('mousedown', this.handleClick, false)
    }
    componentWillUnmount () {
        document.removeEventListener('mousedown', this.handleClick, false)
    }
    handleClick = e => {
        for (const $el of e.path) {
            if ($el.classList && $el.classList.contains('theme-header')) {
                return
            }
        }
        this.handleClose()
    }
    render () {
        const { updateTheme, theme, title, titleFontSize } = this.props
        this.applyThemeToPreview(theme)
        return (
            <div className="theme-layout">
                <div className="theme-settings">
                    <h3 className="subtitle">Theme</h3>
                    <p className="help">Personalize colors to match your brand.</p>
                    <div>
                        {this.themeHelp(theme).map(t => (
                            <ThemePicker
                                theme={t}
                                updateTheme={updateTheme}
                                onSelectTheme={this.selectTheme}
                                selectedTheme={this.state.selectedTheme}
                                handleClose={this.handleClose}
                                key={t.key} />
                        ))}
                    </div>
                </div>
                <div className="theme-preview">
                    <h3 className="subtitle">Theme preview</h3>
                    <Title title={title} titleFontSize={titleFontSize}/>
                    <div className="theme-widgets">
                        <Fab />
                        <span className="icon">
                            <i className="fa fa-thumbs-up has-text-theme"/>
                        </span>
                        <button className="button is-primary is-small">Post</button>
                    </div>
                </div>
            </div>
        )
    }
    themeHelp (theme) {
        return Object.keys(theme).map(key => {
            let displayName
            let desc
            if (key === 'color') {
                displayName = 'Color'
                desc = 'The main theme. Used for backgrounds, borders, buttons, etc.'
            } else if (key === 'colorSecondary') {
                displayName = 'Title gradient color'
                desc = `If you don't want a gradient, set this color equal to the main theme.`
            } else if (key === 'colorContrast') {
                displayName = 'Contrast color'
                desc = `A color that is visible against the main theme. For example,
                        if you select a bright theme, you may want to select a dark
                        contrast color, and vice versa.`
            }
            return { key, value: theme[key], displayName, desc }
        })
    }
    selectTheme (theme) {
        const { selectedTheme } = this.state
        const toSelect = theme.key === selectedTheme.key ? {} : theme
        this.setState({ selectedTheme: toSelect })
    }
    handleClose () {
        this.setState({ selectedTheme: {} })
    }
    applyThemeToPreview (theme) {
        const $root = document.querySelector('.theme-preview')
        if (!$root) {
            return
        }
        const { color, colorSecondary, colorContrast } = theme
        $root.style.setProperty('--theme-color', color)
        $root.style.setProperty('--theme-color-secondary', colorSecondary)
        $root.style.setProperty('--theme-color-contrast', colorContrast)
    }
}

class ThemePicker extends Component {
    constructor (props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    render () {
        const { theme, selectedTheme, onSelectTheme } = this.props
        const style = { background: theme.value }
        return (
            <div key={theme.key} className="theme-field field">
                <div className="theme-header">
                    <div
                        onClick={e => onSelectTheme(theme)}
                        style={style}
                        className="theme-preview-box">
                    </div>
                    <p className="theme-name">{theme.displayName}</p>
                    { selectedTheme.key === theme.key
                        &&  this.themePickerOverlay(theme)}
                </div>
                <p className="help">{theme.desc}</p>
            </div>
        )
    }
    themePickerOverlay (theme) {
        return (
            <SketchPicker
                className="theme-picker"
                disableAlpha
                color={theme.value}
                onChange={this.handleChange} />
        )
    }
    handleChange (color) {
        const { theme } = this.props
        this.props.updateTheme(theme.key, color.hex)
    }
}

export default Theme
