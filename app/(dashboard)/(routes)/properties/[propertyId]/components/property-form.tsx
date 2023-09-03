"use client";

import * as z from "zod";
import { useState } from "react";
import { Property } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import AssetUpload from "@/components/ui/asset-upload";
import { RupeeIcon } from "@/components/icons/rupee";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  images: z.string().array(),
  videos: z.string().array(),
  frontSize: z.string().min(1),
  depthSize: z.string().min(1),
  totalSize: z.string().min(1),
  about: z.string().min(1),
  price: z.string().min(1),
  isAvailable: z.boolean(),
});

type PropertyFormsValues = z.infer<typeof formSchema>;

interface PropertyFormProps {
  initialData: Property | null;
}

export const PropertyForm: React.FC<PropertyFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit property" : "Create property";
  const description = initialData ? "Edit a property" : "Add a new property";
  const toastMessage = initialData ? "Property updated." : "Property created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<PropertyFormsValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      address: "",
      images: [],
      videos: [],
      frontSize: "",
      depthSize: "",
      totalSize: "",
      about: "",
      price: "",
      isAvailable: false,
    },
  });

  const onSubmit = async (data: PropertyFormsValues) => {
    console.log(data);
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/properties/${params.propertyId}`, data);
      } else {
        await axios.post(`/api/properties`, data);
      }
      router.refresh();
      router.push(`/properties`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/properties/${params.propertyId}`);
      router.refresh();
      router.push(`/properties`);
      toast.success("Property deleted.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete()}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <AssetUpload
                    value={field.value}
                    disabled={loading}
                    uploadPreset="iaxv0k2v" // images preset
                    assetName="images"
                    onChange={(url) => field.onChange([...field.value, url])}
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="videos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Videos</FormLabel>
                <FormControl>
                  <AssetUpload
                    value={field.value}
                    disabled={loading}
                    uploadPreset="wzjbn5vp" // videos preset
                    assetName="videos"
                    onChange={(url) => field.onChange([...field.value, url])}
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Property Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Property address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-0 top-0 px-2 h-10 rounded-l-md border border-input bg-accent flex items-center justify-center py-2 text-sm ring-offset-background">
                        <RupeeIcon className="w-5 h-5" />
                      </span>
                      <Input
                        disabled={loading}
                        placeholder="Property price"
                        type="number"
                        {...field}
                        className="pl-[50px]"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="frontSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Front Size</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        disabled={loading}
                        placeholder="Front Size"
                        type="number"
                        {...field}
                      />
                      <span className="absolute top-0 right-0 px-3 h-10 rounded-r-md border border-input bg-accent flex items-center justify-center py-2 text-sm ring-offset-background">
                        m
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="depthSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Depth Size</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        disabled={loading}
                        type="number"
                        placeholder="Depth Size"
                        {...field}
                      />
                      <span className="absolute top-0 right-0 px-3 h-10 rounded-r-md border border-input bg-accent flex items-center justify-center py-2 text-sm ring-offset-background">
                        m
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Size</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        disabled={loading}
                        placeholder="Property price"
                        type="number"
                        {...field}
                      />
                      <span className="absolute top-0 right-0 px-3 h-10 rounded-r-md border border-input bg-accent flex items-center justify-center py-2 text-sm ring-offset-background">
                        m <sup>2</sup>
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="Property price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isAvailable"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 h-fit">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Available</FormLabel>
                    <FormDescription>
                      Check this if the property is currently available. <br />{" "}
                      *Only available properties will be visible to the buyers
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
