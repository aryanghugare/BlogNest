import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Button from '../Button'
import Input from '../Input'
import Select from '../Select'
import RTE from '../RTE'
import Icon from '../Icon'
import service from '../../appwrite/config'
import { plainText } from '../../utils/post'

const slugify = (value) => value.trim().toLowerCase().replace(/[^a-z0-9\s_-]/g, '').replace(/\s+/g, '-').slice(0, 36)
export default function PostForm({ post }) {
  const { register, handleSubmit, setValue, control, formState: { errors, isSubmitting } } = useForm({ defaultValues: { title: post?.title || '', slug: post?.$id || '', content: post?.content || '', status: post?.status || 'active' } })
  const title = useWatch({ control, name: 'title' })
  const image = useWatch({ control, name: 'image' })
  const content = useWatch({ control, name: 'content' })
  const [preview, setPreview] = useState('')
  const [error, setError] = useState('')
  const [slugEdited, setSlugEdited] = useState(false)
  const user = useSelector((state) => state.auth.userData)
  const navigate = useNavigate()
  useEffect(() => {
    if (!post && !slugEdited) setValue('slug', slugify(title))
  }, [title, post, slugEdited, setValue])
  useEffect(() => {
    const file = image?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [image])
  const submit = async (data) => {
    setError('')
    if (!plainText(data.content)) { setError('Give your story a few words before saving.'); return }
    let uploaded = null
    try {
      if (data.image?.[0]) {
        uploaded = await service.uploadFile(data.image[0])
        if (!uploaded) throw new Error('Your cover image couldn’t be uploaded. Please try again.')
      }
      const featuredImage = uploaded?.$id || post?.featuredImage
      const result = post
        ? await service.updatePost(post.$id, { ...data, featuredImage })
        : await service.createPost({ ...data, featuredImage, userId: user.$id })
      if (!result) throw new Error('We couldn’t save your story. Check your connection and try again. If this is a new story, its URL may already be in use.')
      if (post && uploaded && post.featuredImage) await service.deleteFile(post.featuredImage)
      navigate(`/post/${result.$id}`)
    } catch (err) {
      if (uploaded) await service.deleteFile(uploaded.$id)
      setError(err.message)
    }
  }
  const words = plainText(content).split(/\s+/).filter(Boolean).length
  const cover = preview || (post?.featuredImage ? service.getFilePreview(post.featuredImage) : '')
  return <form className="post-form" onSubmit={handleSubmit(submit)} noValidate>
    <div className="editor-top"><div><Link className="back-link" to={post ? `/post/${post.$id}` : '/all-posts'}><Icon name="back" size={16} /> {post ? 'Back to story' : 'Back to the journal'}</Link><p className="eyebrow">{post ? 'WRITING DESK / EDIT ENTRY' : 'WRITING DESK / NEW ENTRY'}</p><h1>{post ? 'Edit story' : 'New story'}</h1><p>Your story, at your pace. Save when you’re ready.</p></div></div>
    {error && <div className="form-alert" role="alert">{error}</div>}
    <div className="editor-layout"><section className="editor-main" aria-label="Story content"><Input className="story-title-field" label="Story title" placeholder="Give your story a title" error={errors.title?.message} {...register('title', { required: 'Give your story a title.', validate: (v) => !!v.trim() || 'Give your story a title.' })} />
      <div className="content-label"><label htmlFor="story-content">Your story</label><span>{words} {words === 1 ? 'word' : 'words'}</span></div>
      <RTE name="content" control={control} defaultValue={post?.content || ''} />
      <p className="editor-tip">Your changes are saved when you select “Save your story” or “Save changes”.</p>
    </section><aside className="editor-sidebar"><section className="settings-card"><div className="settings-title"><h2>Story settings</h2></div><div className="settings-content">
      <div className="form-field"><label htmlFor="cover-image">Cover image</label><div className={`cover-upload ${cover ? 'has-cover' : ''}`}>{cover ? <img src={cover} alt="Your story cover preview" /> : <><span className="upload-circle"><Icon name="upload" size={25} /></span><strong>Add a cover image</strong><span>Drop an image here or choose a file</span></>}<input id="cover-image" type="file" accept="image/png,image/jpeg,image/gif,image/webp" aria-invalid={!!errors.image} aria-describedby="cover-help" {...register('image', { required: post ? false : 'Choose a cover image.', validate: (files) => !files?.[0] || (files[0].size <= 10 * 1024 * 1024 && ['image/png', 'image/jpeg', 'image/gif', 'image/webp'].includes(files[0].type)) || 'Choose a PNG, JPG, WebP, or GIF under 10 MB.' })} /><span className="cover-change">{cover ? 'Change cover image' : 'Browse files'}</span></div><p id="cover-help" className={errors.image ? 'field-error' : 'field-hint'}>{errors.image?.message || 'JPG, PNG, WebP or GIF · Up to 10 MB'}</p></div>
      <Input label="Story URL" placeholder="your-story-title" hint={post ? 'Your published URL stays the same.' : 'A short, unique address for your story.'} readOnly={!!post} error={errors.slug?.message} {...register('slug', { required: 'Add a URL for your story.', pattern: { value: /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,35}$/, message: 'Use up to 36 letters, numbers, dashes, or underscores.' }, onChange: () => setSlugEdited(true) })} />
      <Select label="Visibility" options={[{ value: 'active', label: 'Published' }, { value: 'inactive', label: 'Draft' }]} {...register('status')} />
      <Button type="submit" className="full-width" disabled={isSubmitting}>{isSubmitting ? 'Saving your words…' : post ? 'Save changes' : 'Save your story'}{isSubmitting ? <span className="spinner spinner-small" /> : <Icon name="arrow" size={17} />}</Button>
      <p className="save-note">Drafts stay out of the journal. They can still be opened using their link.</p>
    </div></section><p className="sidebar-note">Published stories appear in the journal. To keep working on a draft, save its link.</p></aside></div>
  </form>
}
