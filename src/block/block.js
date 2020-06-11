/**
 * BLOCK: sf_full_container
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import classnames from 'classnames';
import { createBlock } from '@wordpress/blocks';
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const {} = wp.editor; // podla mozilly je to zasatarale
const {
	BlockControls,
	BlockAlignmentToolbar,
	Toolbar,
	AlignmentToolbar,
	RichText,
	IconButton,
	PanelBody,
	PanelColorSettings,
	MediaUpload,
	ColorPalette,
	InnerBlocks,
	InspectorControls,
	InspectorAdvancedControls
} = wp.blockEditor;
const {
	CheckboxControl,
	RadioControl,
	TextControl,
	ToggleControl,
	SelectControl,
	Button,
	ResponsiveWrapper,
} = wp.components;

const { Fragment } = wp.element;

const sf_inner_template = [
	['core/paragraph', {placeholder: 'Vloz nejaky obsah...' }]
]
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'sfp/full-container-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'SFP - Container block' ), // Block title.
	icon: 'align-center', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	supports: {
    align: [ 'wide', 'full' ],
    anchor: true,
    html: false,
  },
  attributes: {
		align: {
			type: 'string',
			default: '',
		},
		innerBlockContainer: {
			type: 'string',
			default: 'container',
		},
		enableSpacing: {
			type: 'boolean',
			default: false
		},
		spacingTop: {
			type: 'number',
			default: 50
		},
		spacingBottom: {
			type: 'number',
			default: 50
		},
		customBackgroundColor: {
			type: 'string',
		},
		customTextColor: {
			type: 'string',
		},
		bgImage: {
			type: 'object',
			default: null,
		},
		bgOptions: {
			type: 'object',
			default: {
				repeat: false,
				stretch: true,
				fixed: false,
				opacity: 0.7,
			}
		},
  },

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {
const { attributes, setAttributes, } = props;
const {	PanelBody, Toolbar, ToggleControl, RangeControl, Button, IconButton, ResponsiveWrapper } = wp.components;
const { customBackgroundColor, customTextColor, bgImage, bgOptions, enableSpacing, spacingTop, spacingBottom, align, innerBlockContainer } = attributes;

function onImageSelect(media ) {
	setAttributes({
		bgImage: {
			id: media.id,
			image: media.sizes.large || media.sizes.full,
		}
	})
}

const onRemoveBgImage = () => {
	setAttributes( {
		bgImage: null
	} )
}

const PaletteColors = [
	{
		name: 'Greapfruit',
		slug: 'puerto-rico',
		color: '#ed5565'
	},
	{
		name: 'Bittersweet',
		slug: 'bittersweet',
		color: '#fc6e51'
	},
	{
		name: 'Sunflower',
		slug: 'sunflower',
		color: '#ffce54'
	},
	{
		name: 'Grass',
		slug: 'grass',
		color: '#a0d468'
	},
	{
		name: 'Mint',
		slug: 'mint',
		color: '#48cfad'
	},
	{
		name: 'Aqua',
		slug: 'aqua',
		color: '#4fc1e9'
	},
	{
		name: 'Blue jeans',
		slug: 'blue-jeans',
		color: '#5d9cec'
	},
	{
		name: 'Lavander',
		slug: 'lavander',
		color: '#ac92ec'
	},
	{
		name: 'Royal purple',
		slug: 'royal-purple',
		color: '#512E8C'
	},
	{
		name: 'Pink rose',
		slug: 'pink-rose',
		color: '#ec87c0'
	},
	{
		name: 'White',
		slug: 'white',
		color: '#ffffff'
	},
	{
		name: 'Light gray',
		slug: 'light-gray',
		color: '#f5f7fa'
	},
	{
		name: 'Medium gray',
		slug: 'medium-gray',
		color: '#ccd1d9'
	},
	{
		name: 'Dark gray',
		slug: 'dark-gray',
		color: '#656d78'
	},
	{
		name: 'Black',
		slug: 'black',
		color: '#000000'
	}
]

const outClasses = classnames([
	props.className
])

const inClasses = classnames([
	'container'
])
const inStyle = {
	color: customTextColor,
	paddingTop: enableSpacing ? spacingTop + 'px' : undefined,
	paddingBottom: enableSpacing ? spacingBottom + 'px' : undefined
}

const bgClasses = classnames([
	'sfc-bg-image',
	'sfc-absolute'
])
const bgStyle = {
	backgroundColor: customBackgroundColor,
	backgroundImage: bgImage ? 'url(' + bgImage.image.url + ')' : undefined,
	backgroundAttachment: bgOptions.fixed ? 'fixed' : undefined,
	backgroundBlendMode: bgOptions.blendmode ? bgOptions.blendmode : undefined,
	opacity: bgOptions.opacity
}

	return (
		<Fragment>

			<InspectorControls>
				<PanelBody
					title={ __( 'General' ) }
					initialOpen={ true }
					className={classnames('sfc-aligment')}
				>

				<h2>{__('Block Alignment')}</h2>
				<Toolbar>
					<IconButton
						label={ __('none') }
						icon='no-alt'
						className={ classnames(
							'components-toolbar__control',
							{'is-pressed': align === ''}
						)}
						onClick={ () => {setAttributes( {align: ''} );} }
					/>
					<IconButton
						label={ __('wide') }
						icon='align-wide'
						className={ classnames(
							'components-toolbar__control',
							{'is-pressed': align === 'wide'}
						)}
						onClick={ () => {setAttributes( {align: 'wide'} );} }
					/>
					<IconButton
						label={ __('full') }
						icon='align-full-width'
						className={ classnames(
							'components-toolbar__control',
							{'is-pressed': align === 'full'}
						)}
						onClick={ () => {setAttributes( {align: 'full'} );} }
					/>
				</Toolbar>

				<h2>{__('Content BS4 Container')}</h2>
				<Toolbar>
					<IconButton
						label={ __('Container') }
						icon='align-center'
						className={ classnames(
							'components-toolbar__control',
							{'is-pressed': innerBlockContainer === 'container'}
						)}
						onClick={ () => {setAttributes( {innerBlockContainer: 'container'} );} }
					/>
					<IconButton
						label={ __('Container Wide') }
						icon='align-wide'
						className={ classnames(
							'components-toolbar__control',
							{'is-pressed': innerBlockContainer === 'containerWide'}
						)}
						onClick={ () => {setAttributes( {innerBlockContainer: 'containerWide'} );} }
					/>
					<IconButton
						label={ __('Container Fluid') }
						icon='align-full-width'
						className={ classnames(
							'components-toolbar__control',
							{'is-pressed': innerBlockContainer === 'containerFluid'}
						)}
						onClick={ () => {setAttributes( {innerBlockContainer: 'containerFluid'} );} }
					/>
				</Toolbar>

				</PanelBody>

				<PanelBody
					title={ __( 'Spacer Settings' ) }
					initialOpen={ false }
				>

				<ToggleControl
					label={ __( 'Enable spacing' ) }
					checked={ enableSpacing }
					onChange={  ( nextEnableSpacing ) => {
							setAttributes( {
								enableSpacing: nextEnableSpacing,
							} );
						} }
				/>
				{ !! enableSpacing && <RangeControl
						label={ __( 'Spacing top' ) }
						value={ spacingTop }
						onChange={ ( nextSpacing ) => {
							setAttributes( {
								spacingTop: nextSpacing,
							} );
						} }
						min={ 0 }
						max={ 200 }
						step={ 10 }
					/>
				}
				{ !! enableSpacing && <RangeControl
						label={ __( 'Spacing bottom' ) }
						value={ spacingBottom }
						onChange={ ( nextSpacing ) => {
							setAttributes( {
								spacingBottom: nextSpacing,
							} );
						} }
						min={ 0 }
						max={ 200 }
						step={ 10 }
					/>
				}
				</PanelBody>

				<PanelColorSettings
					initialOpen={ false }
					title={ __( 'Text color' ) }
					colorSettings={[
						{
							colors: PaletteColors,
							label: __( 'Text Color' ),
							value: customTextColor,
							onChange: ( nextColor, ...whatelse ) => {
								setAttributes(
									{
										customTextColor: nextColor
									}
								)
							}
						}
					]}
				/>

				<PanelBody
					title={ __( 'Background' ) }
					initialOpen={ false }
				>
					<h2>Vyberte obrázek na pozadí:</h2>

					{ ! bgImage && <MediaUpload
						onSelect={ onImageSelect }
						allowedTypes={ ['image'] }
						value={ bgImage }
						render={ ( { open } ) => (
							<Button className="editor-post-featured-image__toggle" onClick={ open }>
								{ __( 'Set background image' ) }
							</Button>
						) }
					/>}

					{ !! bgImage && <MediaUpload
						onSelect={ onImageSelect }
						allowedTypes={ ['image'] }
						value={ bgImage }
						render={ ( { open } ) => (
							<div className="editor-bg-image">
								<Button className="editor-post-featured-image__preview" onClick={ open }>
									<ResponsiveWrapper
										naturalWidth={ bgImage.image.width }
										naturalHeight={ bgImage.image.height }
									>
										<img src={ bgImage.image.url } alt={ __( 'BG Image' ) } />
									</ResponsiveWrapper>
								</Button>
								<Button onClick={ open } isSecondary isLarge>
									{ __( 'Replace image' ) }
								</Button>
								<Button onClick={ onRemoveBgImage } isLink isDestructive>
									{ __('Remove background image') }
								</Button>
							</div>
						) }
					/>}

					{ !! bgImage && <div className="section-bg-settings">
						<h5 className={'sfc-separator'} style={{marginTop:'1em'}} >{ __( 'Background blend mode' ) }</h5>
						<RangeControl
							label={ __( 'Opacity' ) }
							value={ bgOptions.opacity * 100 }
							onChange={ ( nextOpacity ) => {
								setAttributes( {
									bgOptions: {...bgOptions, opacity: nextOpacity / 100,}
								} )
							} }
							min={ 0 }
							max={ 100 }
							step={ 10 }
						/>
						<SelectControl
							label={ __( 'Blend mode' ) }
							value={ bgOptions.blendmode }
							options={ [
								{ label: 'Normal', value: 'normal' },
								{ label: 'Multiply', value: 'multiply' },
								{ label: 'Screen', value: 'screen' },
								{ label: 'Overlay', value: 'overlay' },
								{ label: 'Darken', value: 'darken' },
								{ label: 'Lighten', value: 'lighten' },
								{ label: 'Color-dodge', value: 'color-dodge' },
								{ label: 'Color-burn', value: 'color-burn' },
								{ label: 'Hard-light', value: 'hard-light' },
								{ label: 'Soft-light', value: 'soft-light' },
								{ label: 'Difference', value: 'difference' },
								{ label: 'Exclusion', value: 'exclusion' },
								{ label: 'Hue', value: 'hue' },
								{ label: 'Saturation', value: 'saturation' },
								{ label: 'Color', value: 'color' },
								{ label: 'Luminosit', value: 'luminosit' },
							] }
							onChange={ ( nextBlendmode ) => {
								setAttributes( {
									bgOptions: {...bgOptions, blendmode: nextBlendmode,}
								} )
							} }
						/>
						<ToggleControl
							label={ __( 'Fixed Background' ) }
							checked={ !! bgOptions.fixed }
							onChange={ ( nextFixed ) => {
								setAttributes( {
									bgOptions: {...bgOptions,fixed: nextFixed,},
								} );
							} }
						/>
					</div>}

					<h5 className={'sfc-separator'} style={{marginTop:'1em'}} >{ __( 'Background Color' ) }</h5>
					<ColorPalette
						colors={ PaletteColors }
						value={ customBackgroundColor }
						onChange={ customBackgroundColor => setAttributes({ customBackgroundColor }) }
					/>

				</PanelBody>

				<PanelBody
					title={ __( 'Bootstrap 4' ) }
					initialOpen={ false }
				>
				<h5>{__('Empty filename')}</h5>
				</PanelBody>

			</InspectorControls>


				<BlockControls>
	    		<Toolbar>
						<IconButton
							label={ __('Container') }
							icon='align-center'
							className={ classnames(
								'components-toolbar__control',
								{'is-pressed': innerBlockContainer === 'container'}
							)}
							onClick={ () => {setAttributes( {innerBlockContainer: 'container'} );} }
						/>
						<IconButton
							label={ __('Container Wide') }
							icon='align-wide'
							className={ classnames(
								'components-toolbar__control',
								{'is-pressed': innerBlockContainer === 'containerWide'}
							)}
							onClick={ () => {setAttributes( {innerBlockContainer: 'containerWide'} );} }
						/>
						<IconButton
							label={ __('Container Fluid') }
							icon='align-full-width'
							className={ classnames(
								'components-toolbar__control',
								{'is-pressed': innerBlockContainer === 'containerFluid'}
							)}
							onClick={ () => {setAttributes( {innerBlockContainer: 'containerFluid'} );} }
						/>
					</Toolbar>
				</BlockControls>


			<div className={ outClasses } >
				<div className={ bgClasses } style={{backgroundColor: customBackgroundColor,}}><div className={'sfc-absolute'} style={ bgStyle }></div></div>
				<div style={ inStyle }>
      	<InnerBlocks
					template={sf_inner_template}
				/>
				</div>
			</div>
		</Fragment>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
const { attributes, setAttributes, } = props;
const { customBackgroundColor, customTextColor, bgImage, bgOptions, enableSpacing, spacingTop, spacingBottom, align, innerBlockContainer } = attributes;

const outClasses = classnames([
	props.className
])

const inClasses = classnames([
	{'container': innerBlockContainer === 'container'},
	{'container-wide': innerBlockContainer === 'containerWide'},
	{'container-fluid': innerBlockContainer === 'containerFluid'}
])
const inStyle = {
	color: customTextColor,
	paddingTop: enableSpacing ? spacingTop + 'px' : undefined,
	paddingBottom: enableSpacing ? spacingBottom + 'px' : undefined
}

const bgClasses = classnames([
	'sfc-bg-image',
	'sfc-absolute'
])
const bgStyle = {
	backgroundColor: customBackgroundColor,
	backgroundImage: bgImage ? 'url(' + bgImage.image.url + ')' : undefined,
	backgroundAttachment: bgOptions.fixed ? 'fixed' : undefined,
	backgroundBlendMode: bgOptions.blendmode ? bgOptions.blendmode : undefined,
	opacity: bgOptions.opacity
}

		return (
			<div className={ outClasses } >
				<div className={ bgClasses } style={{backgroundColor: customBackgroundColor,}}><div className={'sfc-absolute'} style={ bgStyle }></div></div>
				<div className={ inClasses } style={ inStyle }>
      		<InnerBlocks.Content />
				</div>
			</div>

		);
	},
} );
