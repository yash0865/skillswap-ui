/**
 * Payload shape for updating a user's profile.
 * This doesn't map to an existing DTO you've shared yet — mirror these fields
 * on the backend (e.g. an EditProfileDTO) once you're ready to wire this up.
 * See README.md "Backend assumptions" for suggested validation rules.
 */
export interface EditProfileDTO {
    name: string;
    location: string;
    bio: string;
    linkedInURL?: string;
    portfolio?: string;
}