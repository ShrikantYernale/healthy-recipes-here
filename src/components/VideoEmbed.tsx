import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play } from "lucide-react";

interface VideoEmbedProps {
  videoId?: string;
  title?: string;
}

const VideoEmbed = ({
  videoId = "dBnniua6-oM",
  title = "Watch: Healthy Cooking Tips",
}: VideoEmbedProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
    >
      <Card className="shadow-[var(--card-shadow)] border-border overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-xl text-foreground flex items-center gap-2">
            <Play className="h-5 w-5 text-primary" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Recipe Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default VideoEmbed;
