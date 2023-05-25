import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import TopRatedBooks from '../TopRatedBooks'

const BooksSlider = props => {
  const settings = {
    dots: true,
    slidesToScroll: 1,
    slidesToShow: 4,
  }
  const {booksList} = props

  return (
    <ul>
      <Slider {...settings}>
        {booksList.map(each => (
          <TopRatedBooks key={each.id} bookDetails={each} />
        ))}
      </Slider>
    </ul>
  )
}

export default BooksSlider
