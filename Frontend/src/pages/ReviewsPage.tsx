import { Link } from 'react-router-dom';
import { ArrowLeft, Star, MessageCircle } from 'lucide-react';
import logo from '@/assets/logo.jpeg';
import reviewImg1 from "@/assets/reviews/1.jpeg";
import reviewImg2 from "@/assets/reviews/2.jpeg";
import reviewImg3 from "@/assets/reviews/3.jpeg";
import reviewImg4 from "@/assets/reviews/4.jpeg";
import reviewImg5 from "@/assets/reviews/5.jpeg";
import reviewImg6 from "@/assets/reviews/6.jpeg";
import reviewImg7 from "@/assets/reviews/7.jpeg";
import reviewImg8 from "@/assets/reviews/8.jpeg";
import reviewImg9 from "@/assets/reviews/9.jpeg";
import reviewImg10 from "@/assets/reviews/10.jpeg";
import reviewImg11 from "@/assets/reviews/11.jpeg";
import reviewImg12 from "@/assets/reviews/12.jpeg";
import reviewImg13 from "@/assets/reviews/13.jpeg";


// Dummy WhatsApp review screenshots - replace with actual images later
const reviews = [
  {
    id: 1,
    image: reviewImg1,
    // customerName: 'Rahul M.',
    rating: 5,
  },
  {
    id: 2,
    image: reviewImg2,
    // customerName: 'Priya S.',
    rating: 5,
  },
  {
    id: 3,
    image: reviewImg3,
    // customerName: 'Amit K.',
    rating: 5,
  },
  {
    id: 4,
    image: reviewImg4,
    // customerName: 'Sneha R.',
    rating: 5,
  },
  {
    id: 5,
    image: reviewImg5,
    // customerName: 'Vikram J.',
    rating: 4,
  },
  {
    id: 6,
    image: reviewImg6,
    // customerName: 'Neha P.',
    rating: 5,
  },
  // {
  //   id: 7,
  //   image: reviewImg7,
  //   // customerName: 'Rohan D.',
  //   rating: 5,
  // },
  {
    id: 8,
    image: reviewImg8,
    // customerName: 'Ananya B.',
    rating: 5,
  },
  {
    id: 8,
    image: reviewImg9,
    // customerName: 'Ananya B.',
    rating: 5,
  },
  {
    id: 8,
    image: reviewImg10,
    // customerName: 'Ananya B.',
    rating: 5,
  },
  {
    id: 8,
    image: reviewImg11,
    // customerName: 'Ananya B.',
    rating: 5,
  },
  {
    id: 8,
    image: reviewImg12,
    // customerName: 'Ananya B.',
    rating: 5,
  },
  {
    id: 8,
    image: reviewImg13,
    // customerName: 'Ananya B.',
    rating: 5,
  },
  // {
  //   id: 8,
  //   image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=600&fit=crop',
  //   customerName: 'Ananya B.',
  //   rating: 5,
  // },
  // {
  //   id: 8,
  //   image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=600&fit=crop',
  //   customerName: 'Ananya B.',
  //   rating: 5,
  // },
  // {
  //   id: 8,
  //   image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=600&fit=crop',
  //   customerName: 'Ananya B.',
  //   rating: 5,
  // },
  // {
  //   id: 8,
  //   image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=600&fit=crop',
  //   customerName: 'Ananya B.',
  //   rating: 5,
  // },
  // {
  //   id: 8,
  //   image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=600&fit=crop',
  //   customerName: 'Ananya B.',
  //   rating: 5,
  // },
  // {
  //   id: 8,
  //   image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=600&fit=crop',
  //   customerName: 'Ananya B.',
  //   rating: 5,
  // },
  // {
  //   id: 8,
  //   image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=600&fit=crop',
  //   customerName: 'Ananya B.',
  //   rating: 5,
  // },
  // {
  //   id: 8,
  //   image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=600&fit=crop',
  //   customerName: 'Ananya B.',
  //   rating: 5,
  // },
  // {
  //   id: 8,
  //   image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=600&fit=crop',
  //   customerName: 'Ananya B.',
  //   rating: 5,
  // },
  // {
  //   id: 8,
  //   image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=600&fit=crop',
  //   customerName: 'Ananya B.',
  //   rating: 5,
  // },
  // {
  //   id: 8,
  //   image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=600&fit=crop',
  //   customerName: 'Ananya B.',
  //   rating: 5,
  // },
];

const ReviewsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white z-30 shadow-md border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5 text-foreground" />
            <span className="font-medium text-foreground text-sm">Back</span>
          </Link>
          <div className="flex items-center gap-2 ">
            <img src={logo} alt="Mr Mutton" className="h-12 w-12 sm:h-14 sm:w-14 object-contain drop-shadow-md" />
            <span className="font-bold text-primary text-lg hidden sm:block">Mr. Mutton</span>
          </div>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16 pb-8">
        {/* Section Header */}
        <div className="text-center px-4 py-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <MessageCircle className="h-4 w-4 text-primary" />
            <span className="text-primary font-medium text-sm">WhatsApp Reviews</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Reviews & Feedbacks
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
            See what our happy customers are saying about their Mr. Mutton experience!
          </p>
        </div>

        {/* Horizontal Scrolling Reviews - Mobile */}
        <div className="block lg:hidden">
          <div className="flex overflow-x-auto gap-5 px-4 pb-4 scrollbar-hide snap-x snap-mandatory">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex-shrink-0 w-[280px] snap-center"
              >
                <div className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={review.image}
                      // alt={`Review from ${review.customerName}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      {/* <p className="text-white font-semibold text-sm">{review.customerName}</p> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grid Layout - Desktop/Laptop */}
        <div className="hidden lg:block px-8">
          <div className="grid grid-cols-6 gap-4 max-w-7xl mx-auto">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="group"
              >
                <div className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={review.image}
                      // alt={`Review from ${review.customerName}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      {/* <p className="text-white font-semibold">{review.customerName}</p> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center px-4 pt-10">
          <p className="text-muted-foreground mb-4 text-sm">
            Loved our food? Share your experience with us!
          </p>
          <a
            href="https://g.page/r/CYBFAHa8e50AEAE/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
          >
            <Star className="h-4 w-4 fill-current" />
            Leave a Review
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;