'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useUser } from '@supabase/auth-helpers-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function Hotels() {
  const user = useUser();
  const [hotels, setHotels] = useState<any[]>([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    if (user) fetchHotels();
  }, [user]);

  async function fetchHotels() {
    const { data: hotelsData, error } = await supabase
      .from('hotels')
      .select('*, hotel_reviews(rating)')
      .eq('user_id', user?.id);

    if (error) console.error(error);

    const hotelsWithRatings = hotelsData?.map((hotel) => {
      const ratings = hotel.hotel_reviews || [];
      const avg_rating =
        ratings.reduce((sum, r) => sum + r.rating, 0) / (ratings.length || 1);
      return { ...hotel, avg_rating: parseFloat(avg_rating.toFixed(1)) };
    });

    setHotels(hotelsWithRatings || []);
  }

  async function fetchReviews(hotel: any) {
    setSelectedHotel(hotel);

    const { data, error } = await supabase
      .from('hotel_reviews')
      .select('rating, review_text, created_at')
      .eq('hotel_id', hotel.id)
      .order('created_at', { ascending: false });

    if (!error) setReviews(data || []);
  }

  async function submitReview() {
    if (!selectedHotel || !user) return;

    const { error } = await supabase.from('hotel_reviews').insert({
      user_id: user.id,
      hotel_id: selectedHotel.id,
      rating,
      review_text: reviewText,
    });

    if (error) {
      console.error('Error submitting review:', error);
    } else {
      setReviewText('');
      setRating(5);
      fetchReviews(selectedHotel); // refresh reviews
      fetchHotels(); // update average
    }
  }

  const filteredHotels = hotels.filter((hotel) =>
    hotel.location?.toLowerCase().includes(locationFilter.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Hotels</h1>

      <Input
        placeholder="Filter by location"
        value={locationFilter}
        onChange={(e) => setLocationFilter(e.target.value)}
        className="mb-4"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredHotels.map((hotel) => (
          <div key={hotel.id} className="border rounded-xl p-4 shadow">
            <h2 className="text-xl font-semibold">{hotel.name}</h2>
            <p className="text-gray-500">{hotel.location}</p>
            <p className="text-sm text-yellow-600">
              ⭐ {hotel.avg_rating || 'No ratings yet'}
            </p>
            <Button
              className="mt-2"
              onClick={() => fetchReviews(hotel)}
              variant="outline"
            >
              View Reviews
            </Button>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {selectedHotel && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-2">
              Reviews for {selectedHotel.name}
            </h2>

            {reviews.length > 0 ? (
              <div className="space-y-3 mb-4">
                {reviews.map((r, i) => (
                  <div key={i} className="border p-2 rounded">
                    <div>⭐ {r.rating}</div>
                    <p className="text-sm text-gray-600">{r.review_text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mb-4">No reviews yet.</p>
            )}

            <div className="space-y-2">
              <label className="block">
                Rating (1–5):
                <Input
                  type="number"
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  min={1}
                  max={5}
                />
              </label>
              <Textarea
                placeholder="Leave your review here"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <Button onClick={submitReview}>Submit Review</Button>
              <Button
                variant="ghost"
                onClick={() => setSelectedHotel(null)}
                className="mt-2"
              >
                Close
              </Button>
            </div>

            
            <div className="space-y-2">
              <label className="block">
                Rating (1–5):
                <Input
                  type="number"
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  min={1}
                  max={5}
                />
              </label>
              <Textarea
                placeholder="Leave your review here"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <Button onClick={submitReview}>Submit Review</Button>
              <Button
                variant="ghost"
                onClick={() => setSelectedHotel(null)}
                className="mt-2"
              >
                Close
              </Button>
            </div>


            
            <div className="space-y-2">
              <label className="block">
                Rating (1–5):
                <Input
                  type="number"
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  min={1}
                  max={5}
                />
              </label>
              <Textarea
                placeholder="Leave your review here"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <Button onClick={submitReview}>Submit Review</Button>
              <Button
                variant="ghost"
                onClick={() => setSelectedHotel(null)}
                className="mt-2"
              >
                Close
              </Button>
            </div>



            
            <div className="space-y-2">
              <label className="block">
                Rating (1–5):
                <Input
                  type="number"
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  min={1}
                  max={5}
                />
              </label>
              <Textarea
                placeholder="Leave your review here"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <Button onClick={submitReview}>Submit Review</Button>
              <Button
                variant="ghost"
                onClick={() => setSelectedHotel(null)}
                className="mt-2"
              >
                Close
              </Button>
            </div>


            
            <div className="space-y-2">
              <label className="block">
                Rating (1–5):
                <Input
                  type="number"
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  min={1}
                  max={5}
                />
              </label>
              <Textarea
                placeholder="Leave your review here"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <Button onClick={submitReview}>Submit Review</Button>
              <Button
                variant="ghost"
                onClick={() => setSelectedHotel(null)}
                className="mt-2"
              >
                Close
              </Button>
            </div>


            
            <div className="space-y-2">
              <label className="block">
                Rating (1–5):
                <Input
                  type="number"
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  min={1}
                  max={5}
                />
              </label>
              <Textarea
                placeholder="Leave your review here"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <Button onClick={submitReview}>Submit Review</Button>
              <Button
                variant="ghost"
                onClick={() => setSelectedHotel(null)}
                className="mt-2"
              >
                Close
              </Button>
            </div>



            
            <div className="space-y-2">
              <label className="block">
                Rating (1–5):
                <Input
                  type="number"
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  min={1}
                  max={5}
                />
              </label>
              <Textarea
                placeholder="Leave your review here"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <Button onClick={submitReview}>Submit Review</Button>
              <Button
                variant="ghost"
                onClick={() => setSelectedHotel(null)}
                className="mt-2"
              >
                Close
              </Button>
            </div>



            
            <div className="space-y-2">
              <label className="block">
                Rating (1–5):
                <Input
                  type="number"
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  min={1}
                  max={5}
                />
              </label>
              <Textarea
                placeholder="Leave your review here"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <Button onClick={submitReview}>Submit Review</Button>
              <Button
                variant="ghost"
                onClick={() => setSelectedHotel(null)}
                className="mt-2"
              >
                Close
              </Button>
            </div>


            
            <div className="space-y-2">
              <label className="block">
                Rating (1–5):
                <Input
                  type="number"
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  min={1}
                  max={5}
                />
              </label>
              <Textarea
                placeholder="Leave your review here"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <Button onClick={submitReview}>Submit Review</Button>
              <Button
                variant="ghost"
                onClick={() => setSelectedHotel(null)}
                className="mt-2"
              >
                Close
              </Button>
            </div>



            
            <div className="space-y-2">
              <label className="block">
                Rating (1–5):
                <Input
                  type="number"
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  min={1}
                  max={5}
                />
              </label>
              <Textarea
                placeholder="Leave your review here"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <Button onClick={submitReview}>Submit Review</Button>
              <Button
                variant="ghost"
                onClick={() => setSelectedHotel(null)}
                className="mt-2"
              >
                Close
              </Button>
            </div>



            
            <div className="space-y-2">
              <label className="block">
                Rating (1–5):
                <Input
                  type="number"
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  min={1}
                  max={5}
                />
              </label>
              <Textarea
                placeholder="Leave your review here"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <Button onClick={submitReview}>Submit Review</Button>
              <Button
                variant="ghost"
                onClick={() => setSelectedHotel(null)}
                className="mt-2"
              >
                Close
              </Button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
